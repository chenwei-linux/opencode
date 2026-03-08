---
name: perf-tuning
description: Linux performance tuning and optimization for CPU, memory, disk I/O, and network. Use for any performance-related diagnosis or optimization task.
---

# Linux Performance Tuning and Optimization

Comprehensive skill for diagnosing and resolving Linux performance issues across CPU, memory, disk I/O, and network subsystems.

## Quick Decision Trees

### "System is slow"

```
System is slow?
├─ High CPU usage? → Check CPU diagnosis
├─ Out of memory / swapping? → Check Memory diagnosis
├─ High wait times / slow disk? → Check Disk I/O diagnosis
└─ Dropped packets / high latency? → Check Network diagnosis
```

## CPU Diagnosis

When CPU usage is high or system load is elevated:

| Command           | Description                                            |
| ----------------- | ------------------------------------------------------ |
| `top`             | Real-time view of running processes and system summary |
| `htop`            | Interactive process viewer (if installed)              |
| `mpstat -P ALL 1` | Per-processor statistics (requires sysstat)            |
| `pidstat 1`       | CPU usage per process                                  |
| `perf top`        | System profiling to find CPU-heavy functions           |
| `uptime`          | Quick check of system load averages (1, 5, 15 min)     |

## Memory Diagnosis

When the system is running out of memory or swapping heavily:

| Command                                     | Description                                                   |
| ------------------------------------------- | ------------------------------------------------------------- | ------------------------------ |
| `free -h`                                   | Show free and used memory in human-readable format            |
| `vmstat 1`                                  | Virtual memory statistics (watch `si`/`so` for swap activity) |
| `slabtop`                                   | Display kernel slab cache information in real time            |
| `cat /proc/meminfo`                         | Detailed memory statistics                                    |
| `ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%mem | head`                                                         | Top memory-consuming processes |

## Disk I/O Diagnosis

When disk operations are slow or system is waiting on I/O:

| Command                | Description                          |
| ---------------------- | ------------------------------------ |
| `iostat -xz 1`         | Extended I/O statistics per device   |
| `iotop`                | Top-like I/O monitor per process     |
| `blktrace -d /dev/sda` | Trace block device I/O               |
| `fio`                  | Flexible I/O tester for benchmarking |
| `df -h`                | Check disk space usage               |

## Network Diagnosis

When network latency is high or throughput is low:

| Command                   | Description                                           |
| ------------------------- | ----------------------------------------------------- |
| `sar -n DEV 1`            | Network interface statistics                          |
| `ss -s`                   | Socket statistics summary                             |
| `ethtool eth0`            | Query or control network driver and hardware settings |
| `tc -s qdisc ls dev eth0` | Show traffic control queuing disciplines              |
| `iftop`                   | Display bandwidth usage on an interface by host       |

## Tuning Parameters

### Sysctl Settings (`/etc/sysctl.conf`)

- **Network Tuning:**
  - `net.core.somaxconn = 65535` (Increase max socket backlog)
  - `net.ipv4.tcp_max_syn_backlog = 65535` (Increase SYN backlog)
  - `net.ipv4.tcp_tw_reuse = 1` (Reuse TIME_WAIT sockets)
- **Memory Tuning:**
  - `vm.swappiness = 10` (Reduce tendency to swap, default is usually 60)
  - `vm.dirty_ratio = 15` (Max percentage of memory for dirty pages)
  - `vm.dirty_background_ratio = 5` (Percentage of memory before background writeback)

### Ulimits (`/etc/security/limits.conf`)

- Increase open file descriptors:
  - `* soft nofile 65535`
  - `* hard nofile 65535`

### Scheduler Tuning

- Change I/O scheduler (e.g., to `mq-deadline` or `none` for NVMe):
  - `echo mq-deadline > /sys/block/sda/queue/scheduler`

## Common Fixes

| Symptom                        | Potential Cause                    | Solution                                                |
| ------------------------------ | ---------------------------------- | ------------------------------------------------------- |
| High load, low CPU usage       | High I/O wait (disk bottleneck)    | Check `iostat`, optimize queries, upgrade to SSD        |
| System unresponsive, high swap | Out of memory (OOM)                | Check `free -h`, tune `vm.swappiness`, add RAM or swap  |
| Network connections dropping   | Socket backlog full                | Increase `net.core.somaxconn` and `tcp_max_syn_backlog` |
| "Too many open files" error    | File descriptor limit reached      | Increase `nofile` in `limits.conf` and `fs.file-max`    |
| High CPU in `sy` (system)      | High context switching or syscalls | Profile with `perf`, optimize application threading     |
