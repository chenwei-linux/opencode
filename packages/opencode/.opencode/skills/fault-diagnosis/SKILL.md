---
name: fault-diagnosis
description: Linux fault diagnosis and root cause analysis for system crashes, service failures, and hardware issues. Use for any troubleshooting or incident response task.
---

# Linux Fault Diagnosis and Root Cause Analysis

Comprehensive skill for diagnosing system crashes, service failures, hardware issues, and network outages.

## Quick Decision Trees

### "Incident Response"

```
What is failing?
├─ Service down or restarting? → Check Service Troubleshooting & Logs
├─ System crashed or rebooted? → Check Crash Analysis & Hardware
├─ Network unreachable? → Check Network Troubleshooting
└─ Data missing or corrupted? → Check Hardware Diagnostics & Logs
```

## Log Analysis

The first step in any diagnosis is checking the logs:

| Command                           | Description                                             |
| --------------------------------- | ------------------------------------------------------- |
| `journalctl -xe`                  | View recent systemd journal entries with explanations   |
| `journalctl -u nginx.service`     | View logs for a specific service                        |
| `journalctl -b -1`                | View logs from the previous boot (useful after a crash) |
| `dmesg -T`                        | View kernel ring buffer with human-readable timestamps  |
| `tail -f /var/log/syslog`         | Follow system log (Debian/Ubuntu)                       |
| `tail -f /var/log/messages`       | Follow system log (RHEL/CentOS)                         |
| `grep -i error /var/log/auth.log` | Search for authentication errors                        |

### Log Rotation

Check `/etc/logrotate.conf` and `/etc/logrotate.d/` if logs are missing or filling up the disk.

## Service Troubleshooting

Diagnosing systemd services:

| Command                                    | Description                                          |
| ------------------------------------------ | ---------------------------------------------------- |
| `systemctl status service_name`            | Check current status, uptime, and recent logs        |
| `systemctl list-dependencies service_name` | View service dependencies                            |
| `systemctl show service_name`              | Show low-level service properties                    |
| `systemctl reset-failed`                   | Clear failed status of services                      |
| `strace -p PID`                            | Trace system calls and signals for a running process |
| `lsof -p PID`                              | List open files for a specific process               |

## Crash Analysis

Investigating system crashes and unexpected terminations:

| Command / File                            | Description                                             |
| ----------------------------------------- | ------------------------------------------------------- | ----------------------------------- |
| `coredumpctl list`                        | List available core dumps                               |
| `coredumpctl info PID`                    | Show details about a specific core dump                 |
| `gdb /path/to/binary /path/to/core`       | Analyze a core dump with GDB                            |
| `grep -i "out of memory" /var/log/syslog` | Check for OOM killer invocations                        |
| `dmesg                                    | grep -i "killed process"`                               | Find processes killed by the kernel |
| `/proc/sys/vm/panic_on_oom`               | Check if system panics on OOM (0=kill process, 1=panic) |

## Hardware Diagnostics

Checking for failing hardware components:

| Command                | Description                                      |
| ---------------------- | ------------------------------------------------ |
| `smartctl -a /dev/sda` | Check S.M.A.R.T. health status of a disk         |
| `lsblk -f`             | List block devices and their filesystems         |
| `lspci -v`             | List PCI devices and their drivers               |
| `lsusb`                | List USB devices                                 |
| `dmidecode -t memory`  | Display hardware information (e.g., RAM modules) |
| `lshw -short`          | List hardware configuration                      |

## Network Troubleshooting

Diagnosing connectivity issues:

| Command                   | Description                                              |
| ------------------------- | -------------------------------------------------------- |
| `ping -c 4 8.8.8.8`       | Test basic ICMP connectivity                             |
| `traceroute 8.8.8.8`      | Trace the route packets take to a destination            |
| `mtr 8.8.8.8`             | Combined ping and traceroute (continuous)                |
| `dig +short example.com`  | Perform DNS lookup                                       |
| `ss -tulnp`               | List listening TCP/UDP ports and associated processes    |
| `tcpdump -i eth0 port 80` | Capture network traffic on a specific interface and port |
| `ip route show`           | Display the IP routing table                             |

## Common Failure Patterns

| Symptom                   | Potential Cause                          | Diagnostic Steps                                 |
| ------------------------- | ---------------------------------------- | ------------------------------------------------ |
| Service fails to start    | Configuration error, port conflict       | `systemctl status`, `journalctl -u`, `ss -tulnp` |
| System reboots randomly   | Hardware failure (RAM/PSU), kernel panic | `journalctl -b -1`, `dmesg`, `smartctl`          |
| "No space left on device" | Disk full, inode exhaustion              | `df -h`, `df -i`, `du -sh /*`                    |
| High load, system hangs   | OOM killer, I/O wait, CPU starvation     | `dmesg`, `top`, `iostat`                         |
| Cannot resolve hostnames  | DNS configuration issue                  | `cat /etc/resolv.conf`, `dig`, `ping 8.8.8.8`    |
