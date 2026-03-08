---
name: config-mgmt
description: Linux configuration management for system services, packages, and infrastructure. Use for service configuration, package management, and system setup tasks.
---

# Linux Configuration Management

Comprehensive skill for managing system configurations, packages, services, network settings, and storage infrastructure.

## Quick Decision Trees

### "Configuration Management"

```
What needs configuration?
├─ Need to install or update software? → Check Package Management
├─ Need to manage background processes? → Check Service Management
├─ Need to configure IP addresses or routing? → Check Network Configuration
├─ Need to manage disks or filesystems? → Check Storage Configuration
└─ Need to automate recurring tasks? → Check Scheduled Tasks
```

## Package Management

Commands for managing software packages across different distributions:

### Debian / Ubuntu (APT)

- `apt update` (Update package lists)
- `apt upgrade` (Upgrade installed packages)
- `apt install package_name` (Install a package)
- `apt remove package_name` (Remove a package)
- `apt search keyword` (Search for a package)

### RHEL / CentOS / Fedora (DNF / YUM)

- `dnf check-update` (Check for updates)
- `dnf upgrade` (Upgrade installed packages)
- `dnf install package_name` (Install a package)
- `dnf remove package_name` (Remove a package)
- `dnf search keyword` (Search for a package)

### Arch Linux (Pacman)

- `pacman -Syu` (Synchronize and update system)
- `pacman -S package_name` (Install a package)
- `pacman -Rs package_name` (Remove a package and its unused dependencies)
- `pacman -Ss keyword` (Search for a package)

## Service Management

Managing systemd services and timers:

| Command                          | Description                                                    |
| -------------------------------- | -------------------------------------------------------------- |
| `systemctl start service_name`   | Start a service immediately                                    |
| `systemctl stop service_name`    | Stop a running service                                         |
| `systemctl restart service_name` | Restart a service                                              |
| `systemctl reload service_name`  | Reload service configuration without stopping                  |
| `systemctl enable service_name`  | Enable a service to start on boot                              |
| `systemctl disable service_name` | Disable a service from starting on boot                        |
| `systemctl mask service_name`    | Prevent a service from being started manually or automatically |
| `systemctl list-timers`          | List active systemd timers (cron alternatives)                 |

### Creating a Systemd Unit File (`/etc/systemd/system/my-service.service`)

```ini
[Unit]
Description=My Custom Service
After=network.target

[Service]
ExecStart=/usr/local/bin/my-app
Restart=always
User=myuser

[Install]
WantedBy=multi-user.target
```

Run `systemctl daemon-reload` after creating or modifying unit files.

## Network Configuration

Managing network interfaces and settings:

### NetworkManager (nmcli)

- `nmcli device status` (List network devices and their status)
- `nmcli connection show` (List network connections)
- `nmcli connection up id "Wired connection 1"` (Bring up a connection)
- `nmcli connection modify eth0 ipv4.addresses 192.168.1.10/24 ipv4.gateway 192.168.1.1 ipv4.method manual` (Set static IP)

### systemd-networkd

Configuration files are located in `/etc/systemd/network/`.
Example `/etc/systemd/network/20-wired.network`:

```ini
[Match]
Name=eth0

[Network]
Address=192.168.1.10/24
Gateway=192.168.1.1
DNS=8.8.8.8
```

### Debian/Ubuntu Legacy (`/etc/network/interfaces`)

```text
auto eth0
iface eth0 inet static
    address 192.168.1.10
    netmask 255.255.255.0
    gateway 192.168.1.1
```

## Storage Configuration

Managing disks, partitions, and filesystems:

### LVM (Logical Volume Manager)

- `pvcreate /dev/sdb1` (Create physical volume)
- `vgcreate my_vg /dev/sdb1` (Create volume group)
- `lvcreate -L 10G -n my_lv my_vg` (Create logical volume)
- `lvextend -L +5G /dev/my_vg/my_lv` (Extend logical volume)
- `resize2fs /dev/my_vg/my_lv` (Resize ext4 filesystem to fill LV)

### mdadm (Software RAID)

- `mdadm --create --verbose /dev/md0 --level=1 --raid-devices=2 /dev/sdb1 /dev/sdc1` (Create RAID 1 array)
- `cat /proc/mdstat` (Check RAID status)

### fstab (`/etc/fstab`)

Configuring filesystems to mount at boot:

```text
# Device                                Mount Point   Type   Options          Dump Pass
UUID=12345678-1234-1234-1234-1234567890 /data         ext4   defaults,noatime 0    2
```

Run `mount -a` to mount all filesystems listed in fstab.

## Scheduled Tasks

Automating recurring jobs:

### Cron

- `crontab -e` (Edit current user's crontab)
- `crontab -l` (List current user's crontab)
- `/etc/crontab` (System-wide crontab file)
- `/etc/cron.d/`, `/etc/cron.daily/`, `/etc/cron.hourly/`, `/etc/cron.monthly/`, `/etc/cron.weekly/` (Directories for system-wide cron jobs)

Cron format: `* * * * * command to execute` (Minute, Hour, Day of Month, Month, Day of Week)

## Environment Variables

Configuring system-wide settings:

- `/etc/environment`: System-wide environment variables (key=value format, no export command).
- `/etc/profile` and `/etc/profile.d/*.sh`: System-wide initialization scripts for login shells.
- `~/.bashrc` or `~/.zshrc`: User-specific shell initialization scripts.

## Backup Configuration Patterns

Common strategies for system backups:

- **rsync:** `rsync -avz --delete /source/ /destination/` (Mirror directories locally or over SSH)
- **tar:** `tar -czvf backup.tar.gz /etc /var/www` (Create compressed archive of important directories)
- **Database Dumps:** `mysqldump -u root -p database_name > backup.sql` or `pg_dump database_name > backup.sql`
