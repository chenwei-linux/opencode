---
name: usage-guide
description: Linux system usage guide covering common administrative tasks, user management, and daily operations. Use as a general reference for Linux system administration.
---

# Linux System Usage Guide

General reference for daily Linux system administration, user management, and common operational tasks.

## Quick Decision Trees

### "Common Administrative Tasks"

```
What do you need to do?
├─ Manage users or permissions? → Check User Management
├─ Check disk space or find large files? → Check Disk Usage
├─ Manage running programs? → Check Process Management
├─ Find system hardware/OS details? → Check System Information
├─ Search for or move files? → Check File Operations
└─ Monitor system activity? → Check Monitoring
```

## User Management

Managing accounts and access:

| Command                          | Description                                   |
| -------------------------------- | --------------------------------------------- |
| `useradd -m username`            | Create a new user with a home directory       |
| `userdel -r username`            | Delete a user and their home directory        |
| `groupadd groupname`             | Create a new group                            |
| `usermod -aG groupname username` | Add a user to a group                         |
| `passwd username`                | Change a user's password                      |
| `id username`                    | Display user and group IDs                    |
| `whoami`                         | Print the current user                        |
| `w` or `who`                     | Show who is logged on and what they are doing |

## Disk Usage

Monitoring and managing storage space:

| Command               | Description                                                      |
| --------------------- | ---------------------------------------------------------------- | ----------- | ----------------------------------------- |
| `df -h`               | Show file system disk space usage (human-readable)               |
| `df -i`               | Show inode usage (useful if disk is full but space is available) |
| `du -sh /path/to/dir` | Estimate file space usage for a directory                        |
| `du -ah /path         | sort -rh                                                         | head -n 10` | Find the top 10 largest files/directories |
| `ncdu /`              | Interactive ncurses disk usage analyzer (if installed)           |
| `quota -v`            | Display disk usage and limits for a user                         |

## Process Management

Controlling and interacting with running programs:

| Command               | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| `ps aux`              | Display all running processes                                |
| `ps -ef`              | Display all running processes (standard syntax)              |
| `kill PID`            | Send SIGTERM to a process (graceful termination)             |
| `kill -9 PID`         | Send SIGKILL to a process (force termination)                |
| `pkill -f name`       | Kill processes matching a pattern                            |
| `nice -n 10 command`  | Run a command with modified scheduling priority              |
| `renice -n 10 -p PID` | Alter priority of a running process                          |
| `nohup command &`     | Run a command immune to hangups (keeps running after logout) |
| `tmux` or `screen`    | Terminal multiplexers for persistent sessions                |

## System Information

Gathering details about the OS and hardware:

| Command               | Description                                                 |
| --------------------- | ----------------------------------------------------------- |
| `uname -a`            | Print all system information (kernel version, architecture) |
| `hostnamectl`         | Query or change system hostname and OS details              |
| `cat /etc/os-release` | Display OS identification data                              |
| `lscpu`               | Display information about the CPU architecture              |
| `free -h`             | Display amount of free and used memory                      |
| `uptime`              | Tell how long the system has been running and load average  |
| `lsblk`               | List information about block devices                        |

## File Operations

Searching, manipulating, and transferring files:

| Command                          | Description                                           |
| -------------------------------- | ----------------------------------------------------- | ------------------------------------ |
| `find /path -name "*.txt"`       | Search for files by name                              |
| `find /path -type f -mtime -7`   | Find files modified in the last 7 days                |
| `locate filename`                | Find files by name using a pre-built database         |
| `grep -rnw '/path' -e 'pattern'` | Search for a string recursively in files              |
| `find . -name "\*.log"           | xargs rm`                                             | Execute a command on a list of files |
| `rsync -avz /src /dest`          | Fast, versatile, remote (and local) file-copying tool |
| `tar -czvf archive.tar.gz /dir`  | Create a compressed archive                           |
| `tar -xzvf archive.tar.gz`       | Extract a compressed archive                          |

## Monitoring

Observing system activity over time:

| Command                | Description                                                |
| ---------------------- | ---------------------------------------------------------- |
| `watch -n 1 'free -h'` | Execute a program periodically, showing output fullscreen  |
| `sar -u 1 5`           | Collect, report, or save system activity information (CPU) |
| `nmon`                 | Ncurses-based system performance monitor (if installed)    |
| `dstat`                | Versatile resource statistics tool                         |
| `glances`              | Cross-platform system monitoring tool                      |

## Quick Troubleshooting

| Question                                   | Solution                                        |
| ------------------------------------------ | ----------------------------------------------- | ------------------------ |
| How do I find what is using port 80?       | `ss -tulnp                                      | grep :80`or`lsof -i :80` |
| How do I check if a service is running?    | `systemctl status service_name`                 |
| How do I view the end of a log file?       | `tail -n 50 /var/log/syslog`                    |
| How do I find large files filling my disk? | `find / -type f -size +100M -exec ls -lh {} \;` |
| How do I safely reboot the system?         | `sudo reboot` or `sudo shutdown -r now`         |
