---
name: security
description: Linux security hardening, audit, and vulnerability management. Use for security assessment, hardening, firewall configuration, and access control.
---

# Linux Security Hardening and Audit

Comprehensive skill for securing Linux systems, managing access controls, configuring firewalls, and auditing for vulnerabilities.

## Quick Decision Trees

### "Security Audit Checklist"

```
Security Audit Needed?
├─ Unauthorized access suspected? → Check Audit Tools & Logs
├─ Need to restrict network access? → Configure Firewall
├─ Need to manage user privileges? → Check User/Group Management
├─ Need to secure remote access? → Check SSH Hardening
└─ Need to enforce mandatory access control? → Check SELinux/AppArmor
```

## User and Group Management

Managing identities and privileges securely:

| Command                            | Description                                       |
| ---------------------------------- | ------------------------------------------------- |
| `useradd -m -s /bin/bash username` | Create a new user with a home directory and shell |
| `usermod -aG sudo username`        | Add user to the sudo group (Debian/Ubuntu)        |
| `usermod -aG wheel username`       | Add user to the wheel group (RHEL/CentOS)         |
| `passwd username`                  | Set or change user password                       |
| `visudo`                           | Safely edit the `/etc/sudoers` file               |
| `chage -l username`                | View password aging information                   |

## SSH Hardening

Best practices for securing `/etc/ssh/sshd_config`:

- `PermitRootLogin no` (Disable direct root login)
- `PasswordAuthentication no` (Require SSH keys)
- `PubkeyAuthentication yes` (Enable public key authentication)
- `AllowUsers user1 user2` (Restrict access to specific users)
- `Port 2222` (Change default SSH port to reduce automated attacks)
- `X11Forwarding no` (Disable X11 forwarding if not needed)

Restart SSH service after changes: `systemctl restart sshd`

## Firewall Management

Configuring network access controls:

### UFW (Uncomplicated Firewall - Debian/Ubuntu)

- `ufw enable` (Enable firewall)
- `ufw default deny incoming` (Deny all incoming by default)
- `ufw allow 22/tcp` (Allow SSH)
- `ufw status verbose` (Check status and rules)

### Firewalld (RHEL/CentOS)

- `firewall-cmd --state` (Check status)
- `firewall-cmd --add-service=ssh --permanent` (Allow SSH permanently)
- `firewall-cmd --reload` (Apply changes)

### Iptables / Nftables

- `iptables -L -v -n` (List current rules)
- `nft list ruleset` (List nftables rules)

## SELinux and AppArmor

Mandatory Access Control (MAC) systems:

### SELinux (RHEL/CentOS)

- `sestatus` (Check SELinux status)
- `setenforce 1` (Enable enforcing mode)
- `getsebool -a` (List SELinux booleans)
- `chcon -t httpd_sys_content_t /var/www/html/file` (Change security context)

### AppArmor (Debian/Ubuntu)

- `aa-status` (Check AppArmor status)
- `aa-enforce /etc/apparmor.d/usr.sbin.nginx` (Put profile in enforce mode)
- `aa-complain /etc/apparmor.d/usr.sbin.nginx` (Put profile in complain mode)

## File Permissions and ACLs

Securing file system access:

| Command                                  | Description                                       |
| ---------------------------------------- | ------------------------------------------------- |
| `chmod 750 directory`                    | Set rwx for owner, r-x for group, none for others |
| `chown user:group file`                  | Change file owner and group                       |
| `setfacl -m u:username:rw file`          | Set Access Control List (ACL) for specific user   |
| `getfacl file`                           | View ACLs for a file                              |
| `find / -perm -4000 -type f 2>/dev/null` | Find files with SUID bit set                      |

## Audit Tools

Tools for monitoring and auditing system security:

| Command                  | Description                                               |
| ------------------------ | --------------------------------------------------------- |
| `auditctl -l`            | List current auditd rules                                 |
| `ausearch -m USER_LOGIN` | Search audit logs for specific events                     |
| `aide --check`           | Advanced Intrusion Detection Environment (file integrity) |
| `lynis audit system`     | Comprehensive security auditing tool                      |
| `chkrootkit`             | Check for signs of rootkits                               |
| `rkhunter --check`       | Rootkit Hunter                                            |

## Common CVE Mitigation Patterns

| Vulnerability Type            | Mitigation Strategy                                                              |
| ----------------------------- | -------------------------------------------------------------------------------- |
| Kernel Privilege Escalation   | Update kernel (`apt upgrade linux-image-generic` or `yum update kernel`), reboot |
| OpenSSL/Glibc Vulnerabilities | Update packages, restart affected services (`systemctl daemon-reexec`)           |
| Remote Code Execution (RCE)   | Apply vendor patches, restrict network access via firewall, use WAF              |
| Denial of Service (DoS)       | Implement rate limiting (iptables/nftables), configure fail2ban                  |
