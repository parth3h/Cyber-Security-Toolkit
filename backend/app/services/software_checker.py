import platform
import subprocess

def get_installed_software():
    software_list = []
    
    if platform.system() == "Windows":
        import winreg
        for key in [winreg.HKEY_LOCAL_MACHINE, winreg.HKEY_CURRENT_USER]:
            try:
                reg = winreg.OpenKey(key, r"Software\Microsoft\Windows\CurrentVersion\Uninstall")
                for i in range(winreg.QueryInfoKey(reg)[0]):
                    try:
                        subkey = winreg.EnumKey(reg, i)
                        software_key = winreg.OpenKey(reg, subkey)
                        software_name = winreg.QueryValueEx(software_key, "DisplayName")[0]
                        version = winreg.QueryValueEx(software_key, "DisplayVersion")[0]
                        software_list.append({"name": software_name, "version": version})
                    except (EnvironmentError, FileNotFoundError):
                        continue
            except FileNotFoundError:
                continue

    elif platform.system() == "Linux":
        try:
            result = subprocess.run(
                ['dpkg-query', '-W', '-f=${Package} ${Version}\n'],
                stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True
            )
            software_list = [
                {"name": line.split()[0], "version": line.split()[1]}
                for line in result.stdout.split('\n') if line
            ]
        except Exception as e:
            print(f"Error retrieving software list: {e}")
    
    return software_list

def list_software():
    """Get list of installed software"""
    return {"software": get_installed_software()}
