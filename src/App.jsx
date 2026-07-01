import { useState, useCallback } from "react";

const DOMAINS = [
  { id: "D1", label: "General Security Concepts", weight: 12, color: "#818cf8" },
  { id: "D2", label: "Threats, Vulnerabilities & Mitigations", weight: 22, color: "#f472b6" },
  { id: "D3", label: "Security Architecture", weight: 18, color: "#34d399" },
  { id: "D4", label: "Security Operations", weight: 28, color: "#fb923c" },
  { id: "D5", label: "Security Program Management & Oversight", weight: 20, color: "#38bdf8" },
];

const DAILY_TARGET = 150;
const START_DATE = "2026-06-22";

const ALL_QUESTIONS = [
{id:"d1q1",domain:"D1",q:"Which of the following BEST describes the CIA triad?",opts:["A. Confidentiality, Integrity, Availability","B. Control, Identification, Authentication","C. Compliance, Integrity, Assurance","D. Confidentiality, Identification, Access"],ans:"A",exp:"The CIA triad — Confidentiality, Integrity, Availability — is the foundational model for information security policy."},
{id:"d1q2",domain:"D1",q:"A message is encrypted with the recipient's public key. Which key decrypts it?",opts:["A. Sender's public key","B. Recipient's public key","C. Recipient's private key","D. Sender's private key"],ans:"C",exp:"In asymmetric encryption, data encrypted with a recipient's public key can only be decrypted with their corresponding private key."},
{id:"d1q3",domain:"D1",q:"Which hashing algorithm produces a 256-bit output?",opts:["A. MD5","B. SHA-1","C. SHA-256","D. RIPEMD-128"],ans:"C",exp:"SHA-256 is part of the SHA-2 family and produces a 256-bit hash. MD5 produces 128-bit and SHA-1 produces 160-bit outputs."},
{id:"d1q4",domain:"D1",q:"What term describes using something you know, something you have, AND something you are for authentication?",opts:["A. Single-factor authentication","B. Two-factor authentication","C. Multi-factor authentication","D. Federated authentication"],ans:"C",exp:"Multi-factor authentication (MFA) requires two or more distinct authentication factors from different categories."},
{id:"d1q5",domain:"D1",q:"Which of the following is a stream cipher?",opts:["A. AES","B. RC4","C. DES","D. Blowfish"],ans:"B",exp:"RC4 is a stream cipher that encrypts data one bit or byte at a time. AES, DES, and Blowfish are block ciphers."},
{id:"d1q6",domain:"D1",q:"A user logs into a system using a password and a fingerprint scan. What type of authentication is this?",opts:["A. Single-factor","B. Two-factor","C. Token-based","D. Certificate-based"],ans:"B",exp:"Using a password (something you know) and a fingerprint (something you are) constitutes two-factor authentication."},
{id:"d1q7",domain:"D1",q:"Which protocol provides secure key exchange using asymmetric cryptography?",opts:["A. AES","B. RSA","C. SHA-256","D. HMAC"],ans:"B",exp:"RSA is an asymmetric algorithm widely used for secure key exchange and digital signatures."},
{id:"d1q8",domain:"D1",q:"What is the purpose of a salt in password hashing?",opts:["A. To encrypt the password before hashing","B. To prevent rainbow table attacks","C. To increase hash output length","D. To enable password recovery"],ans:"B",exp:"A salt is random data added to a password before hashing, making precomputed rainbow table attacks ineffective."},
{id:"d1q9",domain:"D1",q:"Which of the following BEST describes steganography?",opts:["A. Encrypting data with a symmetric key","B. Hiding data within another file or message","C. Signing data with a private key","D. Compressing data to reduce size"],ans:"B",exp:"Steganography conceals secret data within ordinary, non-secret files or messages to avoid detection."},
{id:"d1q10",domain:"D1",q:"What does a CRL (Certificate Revocation List) contain?",opts:["A. A list of trusted root CAs","B. A list of revoked digital certificates","C. A list of expired certificates","D. A list of issued certificates"],ans:"B",exp:"A CRL is a list maintained by a CA of certificates that have been revoked before their expiry date."},
{id:"d1q11",domain:"D1",q:"Which of the following is an example of 'something you are' authentication?",opts:["A. PIN","B. Smart card","C. Iris scan","D. One-time password"],ans:"C",exp:"Biometric factors like iris scans, fingerprints, and facial recognition are 'something you are' (Type 3) authentication factors."},
{id:"d1q12",domain:"D1",q:"What is the key difference between symmetric and asymmetric encryption?",opts:["A. Symmetric is slower than asymmetric","B. Symmetric uses the same key for encryption and decryption","C. Asymmetric uses a single shared key","D. Symmetric provides non-repudiation"],ans:"B",exp:"Symmetric encryption uses one shared key for both operations, while asymmetric uses a public/private key pair."},
{id:"d1q13",domain:"D1",q:"Which of the following provides both integrity and authentication for a message?",opts:["A. Symmetric encryption","B. HMAC","C. Base64 encoding","D. Steganography"],ans:"B",exp:"HMAC (Hash-based Message Authentication Code) uses a secret key and hash function to provide both message integrity and authentication."},
{id:"d1q14",domain:"D1",q:"What is the purpose of OCSP?",opts:["A. To encrypt certificate traffic","B. To check the real-time revocation status of a certificate","C. To issue new certificates","D. To store certificate private keys"],ans:"B",exp:"OCSP (Online Certificate Status Protocol) provides real-time certificate revocation checking as an alternative to downloading CRLs."},
{id:"d1q15",domain:"D1",q:"Which encryption mode is considered insecure because identical plaintext blocks produce identical ciphertext blocks?",opts:["A. CBC","B. GCM","C. ECB","D. CTR"],ans:"C",exp:"ECB (Electronic Codebook) mode encrypts identical blocks identically, revealing patterns in the data and making it insecure."},
{id:"d1q16",domain:"D1",q:"A company wants to ensure data sent between two parties cannot be read by a third party intercepting the traffic. Which property is this?",opts:["A. Integrity","B. Availability","C. Confidentiality","D. Non-repudiation"],ans:"C",exp:"Confidentiality ensures that data is accessible only to authorised parties, preventing eavesdropping."},
{id:"d1q17",domain:"D1",q:"Which of the following is a key management standard used in PKI?",opts:["A. SAML","B. X.509","C. OAuth","D. LDAP"],ans:"B",exp:"X.509 is the standard format for public key certificates used in PKI to bind a public key to an identity."},
{id:"d1q18",domain:"D1",q:"What does the term 'perfect forward secrecy' mean?",opts:["A. Encryption keys are never stored on disk","B. Session keys cannot be compromised even if the server's private key is later exposed","C. All communications use end-to-end encryption","D. Keys are rotated every 24 hours"],ans:"B",exp:"Perfect forward secrecy ensures that session keys are ephemeral, so compromising the long-term private key doesn't expose past sessions."},
{id:"d1q19",domain:"D1",q:"Which of the following BEST describes a digital certificate?",opts:["A. An encrypted version of a user's password","B. A file binding a public key to an identity, signed by a CA","C. A private key stored in hardware","D. A token used for single sign-on"],ans:"B",exp:"A digital certificate is a digitally signed document that binds a public key to an identity, validated by a trusted CA."},
{id:"d1q20",domain:"D1",q:"Which algorithm is commonly used for key exchange in TLS?",opts:["A. AES","B. RSA","C. SHA-256","D. Diffie-Hellman"],ans:"D",exp:"Diffie-Hellman key exchange allows two parties to establish a shared secret over an insecure channel without transmitting the key."},
{id:"d1q21",domain:"D1",q:"What is the PRIMARY difference between authentication and authorisation?",opts:["A. Authentication controls what you can do; authorisation verifies who you are","B. Authentication verifies identity; authorisation determines access rights","C. They are the same concept","D. Authorisation happens before authentication"],ans:"B",exp:"Authentication verifies who you are (identity); authorisation determines what you're allowed to do (access rights)."},
{id:"d1q22",domain:"D1",q:"Which of the following BEST describes a zero-knowledge proof?",opts:["A. Proving knowledge of a secret without revealing the secret itself","B. Authentication without any credentials","C. Encryption without a key","D. Hashing without a salt"],ans:"A",exp:"A zero-knowledge proof allows one party to prove they know a secret to another party without revealing the actual secret."},
{id:"d1q23",domain:"D1",q:"What key length is recommended for RSA encryption to be considered secure today?",opts:["A. 512-bit","B. 1024-bit","C. 2048-bit or higher","D. 128-bit"],ans:"C",exp:"RSA keys of at least 2048 bits are currently recommended; 512 and 1024-bit keys are considered weak against modern attacks."},
{id:"d1q24",domain:"D1",q:"Which of the following describes a collision in hashing?",opts:["A. Two different inputs produce the same hash output","B. A hash cannot be reversed","C. An encrypted hash is intercepted","D. A hash key is compromised"],ans:"A",exp:"A collision occurs when two different inputs produce the same hash value, which is a critical weakness in older algorithms like MD5."},
{id:"d1q25",domain:"D1",q:"What is the purpose of a hardware security module (HSM)?",opts:["A. To provide physical access control","B. To securely generate, store, and manage cryptographic keys","C. To monitor network traffic","D. To enforce firewall rules"],ans:"B",exp:"An HSM is a dedicated hardware device that securely manages cryptographic keys and performs cryptographic operations."},
{id:"d1q26",domain:"D1",q:"Which of the following BEST describes federated identity management?",opts:["A. Using a single password across all systems","B. Allowing identity verification across multiple organisations using a trusted provider","C. Storing all user credentials in a central database","D. Requiring MFA for all logins"],ans:"B",exp:"Federated identity management allows users to authenticate once with a trusted identity provider and access services across multiple organisations."},
{id:"d1q27",domain:"D1",q:"What does TOTP stand for and what is it used for?",opts:["A. Token-Only Transfer Protocol — network security","B. Time-based One-Time Password — MFA authentication","C. Trusted Online Transfer Platform — cloud storage","D. Two-Option Transaction Protocol — banking"],ans:"B",exp:"TOTP generates time-based one-time passwords used as a second factor in MFA, typically via apps like Google Authenticator."},
{id:"d1q28",domain:"D1",q:"Which of the following is a characteristic of asymmetric encryption?",opts:["A. Uses a single shared key","B. Is faster than symmetric encryption","C. Uses mathematically related public/private key pairs","D. Cannot be used for digital signatures"],ans:"C",exp:"Asymmetric encryption uses a mathematically linked key pair — data encrypted with one key can only be decrypted with the other."},
{id:"d1q29",domain:"D1",q:"A user needs to prove a file has not been altered since it was created. What should be used?",opts:["A. Symmetric encryption","B. A digital signature","C. A VPN tunnel","D. A firewall rule"],ans:"B",exp:"A digital signature uses hashing and asymmetric cryptography to verify both the integrity and authenticity of a file."},
{id:"d1q30",domain:"D1",q:"Which of the following is an example of a Type 1 authentication factor?",opts:["A. Smart card","B. Fingerprint","C. Security token","D. PIN"],ans:"D",exp:"Type 1 factors are 'something you know' — passwords, PINs, and security questions all fall into this category."},
{id:"d1q31",domain:"D1",q:"What is the purpose of key escrow?",opts:["A. To destroy encryption keys after use","B. To store a copy of encryption keys with a trusted third party for recovery","C. To share keys between users","D. To rotate keys automatically"],ans:"B",exp:"Key escrow stores copies of encryption keys with a trusted third party, allowing recovery if keys are lost or for lawful access."},
{id:"d1q32",domain:"D1",q:"Which of the following BEST describes obfuscation?",opts:["A. Encrypting data with AES","B. Making data difficult to understand without removing access","C. Hashing a password","D. Digitally signing a document"],ans:"B",exp:"Obfuscation makes code or data harder to understand (e.g. code minification) without fully encrypting it."},
{id:"d1q33",domain:"D1",q:"What is the main purpose of a trust anchor in PKI?",opts:["A. To generate new certificates","B. To serve as the root of trust from which certificate chains are validated","C. To revoke compromised certificates","D. To encrypt private keys"],ans:"B",exp:"A trust anchor, typically a root CA, is the starting point for certificate chain validation — if it's trusted, all certificates it signs are trusted."},
{id:"d1q34",domain:"D1",q:"Which of the following BEST describes ephemeral keys?",opts:["A. Keys that are stored permanently in an HSM","B. Keys generated for a single session and discarded afterwards","C. Keys shared between multiple users","D. Keys used only for hashing"],ans:"B",exp:"Ephemeral keys are temporary, generated for one session and discarded after use, providing perfect forward secrecy."},
{id:"d1q35",domain:"D1",q:"What does the term 'data in transit' refer to?",opts:["A. Data stored on a hard drive","B. Data being processed in RAM","C. Data moving across a network","D. Data archived to tape"],ans:"C",exp:"Data in transit refers to data actively moving across a network, as opposed to data at rest (stored) or in use (being processed)."},
{id:"d1q36",domain:"D1",q:"Which of the following BEST describes a PKI hierarchy with multiple intermediate CAs?",opts:["A. Flat PKI","B. Bridge PKI","C. Hierarchical PKI","D. Web of trust"],ans:"C",exp:"A hierarchical PKI has a root CA at the top, with intermediate CAs below it, creating a chain of trust."},
{id:"d1q37",domain:"D1",q:"What is the purpose of a passphrase compared to a password?",opts:["A. A passphrase is shorter and simpler","B. A passphrase is typically longer and provides greater entropy","C. A passphrase is stored in plain text","D. A passphrase cannot be used for encryption"],ans:"B",exp:"Passphrases are typically longer sequences of words, providing more entropy (randomness) and resistance to brute-force attacks."},
{id:"d1q38",domain:"D1",q:"Which of the following BEST describes the concept of non-repudiation?",opts:["A. Ensuring data is available when needed","B. Preventing a party from denying they performed an action","C. Encrypting data to ensure confidentiality","D. Verifying a user's identity"],ans:"B",exp:"Non-repudiation ensures that a party cannot deny performing an action, typically achieved through digital signatures and audit logs."},
{id:"d1q39",domain:"D1",q:"What is the main security concern with using MD5 for password hashing?",opts:["A. It produces hashes that are too long","B. It is vulnerable to collision attacks and rainbow tables","C. It cannot hash passwords longer than 8 characters","D. It requires a hardware security module"],ans:"B",exp:"MD5 is cryptographically broken — it's vulnerable to collisions and precomputed rainbow table attacks, making it unsuitable for password storage."},
{id:"d1q40",domain:"D1",q:"Which of the following BEST describes certificate pinning?",opts:["A. Storing a certificate in an HSM","B. Hardcoding a specific certificate or public key in an application to prevent MITM attacks","C. Revoking a certificate that has been compromised","D. Extending the validity period of a certificate"],ans:"B",exp:"Certificate pinning associates a specific certificate or public key with a service, preventing attackers from substituting fraudulent certificates."},
{id:"d2q1",domain:"D2",q:"An attacker calls an employee pretending to be IT support and convinces them to reveal their password. What type of attack is this?",opts:["A. Phishing","B. Vishing","C. Smishing","D. Whaling"],ans:"B",exp:"Vishing (voice phishing) uses phone calls to manipulate victims into revealing sensitive information, impersonating trusted parties."},
{id:"d2q2",domain:"D2",q:"Which type of malware encrypts a victim's files and demands payment for the decryption key?",opts:["A. Spyware","B. Adware","C. Ransomware","D. Rootkit"],ans:"C",exp:"Ransomware encrypts victim data and demands a ransom (usually cryptocurrency) in exchange for the decryption key."},
{id:"d2q3",domain:"D2",q:"An attacker intercepts communication between two parties and secretly relays messages between them. What is this called?",opts:["A. Replay attack","B. Man-in-the-middle attack","C. Smurf attack","D. Session fixation"],ans:"B",exp:"A man-in-the-middle (MITM) attack intercepts communication between two parties, potentially reading or altering the data."},
{id:"d2q4",domain:"D2",q:"What type of vulnerability allows an attacker to execute commands on a web server by manipulating database queries?",opts:["A. XSS","B. CSRF","C. SQL injection","D. Buffer overflow"],ans:"C",exp:"SQL injection inserts malicious SQL code into input fields, manipulating database queries to access, modify, or delete data."},
{id:"d2q5",domain:"D2",q:"A previously authenticated user's browser is tricked into sending malicious requests to a web app. What attack is this?",opts:["A. XSS","B. CSRF","C. Clickjacking","D. Session hijacking"],ans:"B",exp:"CSRF (Cross-Site Request Forgery) tricks authenticated users into unknowingly submitting requests to a web application they're logged into."},
{id:"d2q6",domain:"D2",q:"Which of the following BEST describes a rootkit?",opts:["A. Malware that displays unwanted advertisements","B. Malware that hides its presence by modifying the OS","C. A tool for cracking passwords","D. Software that monitors keystrokes"],ans:"B",exp:"A rootkit hides malicious software by modifying the operating system, making it difficult to detect through normal means."},
{id:"d2q7",domain:"D2",q:"An email contains a link to a fake website that mimics a bank's login page, targeting only senior executives. What is this?",opts:["A. Phishing","B. Smishing","C. Whaling","D. Vishing"],ans:"C",exp:"Whaling is a targeted phishing attack specifically aimed at high-profile individuals such as executives or board members."},
{id:"d2q8",domain:"D2",q:"Which attack type exploits the trust a website has in the user's browser?",opts:["A. SQL injection","B. XSS","C. CSRF","D. Directory traversal"],ans:"C",exp:"CSRF exploits the trust a web application has in an authenticated user's browser by forging requests from that browser."},
{id:"d2q9",domain:"D2",q:"What is a watering hole attack?",opts:["A. Flooding a network with traffic","B. Compromising websites frequently visited by targets","C. Intercepting water utility SCADA systems","D. Brute-forcing authentication portals"],ans:"B",exp:"A watering hole attack compromises websites commonly visited by a target group, waiting for victims to visit and infecting them."},
{id:"d2q10",domain:"D2",q:"Which of the following BEST describes a logic bomb?",opts:["A. Malware that spreads via email attachments","B. Code that executes malicious actions when specific conditions are met","C. A physical device used to disrupt systems","D. A type of DDoS attack"],ans:"B",exp:"A logic bomb is dormant malicious code that executes when triggered by a specific event or condition, such as a date or user action."},
{id:"d2q11",domain:"D2",q:"An attacker sends a large number of SYN packets to a server without completing the handshake. What type of attack is this?",opts:["A. Smurf attack","B. SYN flood","C. Ping of death","D. ARP poisoning"],ans:"B",exp:"A SYN flood exploits the TCP handshake by sending many SYN packets without completing them, exhausting server connection resources."},
{id:"d2q12",domain:"D2",q:"Which of the following BEST describes a supply chain attack?",opts:["A. Attacking a company's physical supply warehouse","B. Compromising software or hardware during the production or distribution process","C. Using SQL injection on an e-commerce site","D. Intercepting deliveries to steal hardware"],ans:"B",exp:"Supply chain attacks target the less-secure elements in the supply chain — compromising software updates, hardware, or third-party vendors to reach the target."},
{id:"d2q13",domain:"D2",q:"What does 'threat intelligence' primarily provide?",opts:["A. Automatic patching of vulnerabilities","B. Actionable information about current and emerging threats to inform defensive decisions","C. Encryption of sensitive threat data","D. Physical security monitoring"],ans:"B",exp:"Threat intelligence provides context about threats, threat actors, and attack methods to help organisations make informed security decisions."},
{id:"d2q14",domain:"D2",q:"Which of the following BEST describes an APT (Advanced Persistent Threat)?",opts:["A. A quick, automated attack using known exploits","B. A prolonged, targeted attack by a skilled adversary maintaining long-term access","C. A large-scale DDoS attack","D. A brute-force password attack"],ans:"B",exp:"APTs are sophisticated, long-term attacks typically by nation-states or organised groups, maintaining persistent access to steal data over time."},
{id:"d2q15",domain:"D2",q:"An attacker redirects DNS queries to malicious IP addresses. What is this attack called?",opts:["A. ARP poisoning","B. DNS poisoning","C. BGP hijacking","D. IP spoofing"],ans:"B",exp:"DNS poisoning (cache poisoning) corrupts DNS resolver caches with malicious entries, redirecting users to fraudulent websites."},
{id:"d2q16",domain:"D2",q:"Which vulnerability arises when an application writes data beyond the allocated memory buffer?",opts:["A. SQL injection","B. Integer overflow","C. Buffer overflow","D. Race condition"],ans:"C",exp:"A buffer overflow occurs when a program writes more data to a buffer than it can hold, potentially overwriting adjacent memory and allowing code execution."},
{id:"d2q17",domain:"D2",q:"What is the MAIN purpose of penetration testing?",opts:["A. To monitor network traffic for anomalies","B. To identify and exploit vulnerabilities before attackers do","C. To patch known vulnerabilities automatically","D. To train users on security awareness"],ans:"B",exp:"Penetration testing simulates real attacks to identify exploitable vulnerabilities, providing actionable remediation before malicious actors can exploit them."},
{id:"d2q18",domain:"D2",q:"Which of the following is a passive reconnaissance technique?",opts:["A. Port scanning","B. Sending phishing emails","C. Searching public OSINT sources","D. Running vulnerability scans"],ans:"C",exp:"Passive reconnaissance gathers information without directly interacting with the target — OSINT, social media, and public records are passive methods."},
{id:"d2q19",domain:"D2",q:"Which attack involves sending malicious content via SMS messages?",opts:["A. Phishing","B. Vishing","C. Smishing","D. Spear phishing"],ans:"C",exp:"Smishing (SMS phishing) uses text messages to trick recipients into clicking malicious links or revealing sensitive information."},
{id:"d2q20",domain:"D2",q:"What type of malware secretly monitors and records a user's keystrokes?",opts:["A. Ransomware","B. Rootkit","C. Keylogger","D. Worm"],ans:"C",exp:"A keylogger records keystrokes to capture passwords, credit card numbers, and other sensitive data entered by the user."},
{id:"d2q21",domain:"D2",q:"Which of the following BEST describes a fileless malware attack?",opts:["A. Malware stored in encrypted files","B. Malware that operates in memory without writing to disk","C. Malware disguised as legitimate files","D. Malware spread via USB drives"],ans:"B",exp:"Fileless malware operates entirely in memory (RAM), avoiding disk writes to evade traditional signature-based antivirus detection."},
{id:"d2q22",domain:"D2",q:"An attacker uses valid credentials obtained from a previous breach to attempt logins on multiple sites. What is this?",opts:["A. Password spraying","B. Credential stuffing","C. Brute force","D. Dictionary attack"],ans:"B",exp:"Credential stuffing uses previously breached username/password pairs to attempt logins on other services, exploiting password reuse."},
{id:"d2q23",domain:"D2",q:"What is the difference between a vulnerability scan and a penetration test?",opts:["A. They are the same thing","B. A vulnerability scan identifies weaknesses; a penetration test actively exploits them","C. A penetration test is automated; a vulnerability scan is manual","D. A vulnerability scan requires more expertise"],ans:"B",exp:"Vulnerability scanning identifies potential weaknesses non-intrusively; penetration testing goes further by actively exploiting those vulnerabilities."},
{id:"d2q24",domain:"D2",q:"Which mitigation BEST prevents SQL injection attacks?",opts:["A. Input validation and parameterised queries","B. Encrypting the database","C. Using a WAF only","D. Requiring MFA for database access"],ans:"A",exp:"Parameterised queries (prepared statements) and input validation prevent SQL injection by separating code from data."},
{id:"d2q25",domain:"D2",q:"What is a botnet?",opts:["A. A network of security monitoring tools","B. A collection of compromised devices controlled by an attacker","C. A type of firewall architecture","D. A network used for penetration testing"],ans:"B",exp:"A botnet is a network of compromised computers (bots) controlled remotely by an attacker, often used for DDoS attacks or spam."},
{id:"d2q26",domain:"D2",q:"Which attack targets the weakest link in security — people?",opts:["A. Zero-day exploit","B. Social engineering","C. Buffer overflow","D. SQL injection"],ans:"B",exp:"Social engineering manipulates people into performing actions or revealing information, exploiting human psychology rather than technical vulnerabilities."},
{id:"d2q27",domain:"D2",q:"An attacker gains access to a low-privilege account then escalates to admin. What is this technique?",opts:["A. Lateral movement","B. Privilege escalation","C. Credential stuffing","D. Persistence"],ans:"B",exp:"Privilege escalation involves gaining higher-level permissions than originally granted, moving from a standard user to an administrator or root."},
{id:"d2q28",domain:"D2",q:"Which of the following BEST describes an insider threat?",opts:["A. An attack from a foreign nation-state","B. A risk posed by current or former employees, contractors, or partners","C. Malware introduced via a software update","D. An attack targeting cloud infrastructure"],ans:"B",exp:"Insider threats come from individuals with legitimate access — employees, contractors, or partners — who misuse that access intentionally or accidentally."},
{id:"d2q29",domain:"D2",q:"What is the purpose of a honeypot?",opts:["A. To store backup encryption keys","B. To attract and detect attackers by simulating a vulnerable system","C. To filter malicious web traffic","D. To monitor legitimate user activity"],ans:"B",exp:"A honeypot is a decoy system designed to lure attackers, detect intrusions, and gather intelligence about attack methods."},
{id:"d2q30",domain:"D2",q:"Which of the following BEST describes a race condition vulnerability?",opts:["A. A vulnerability caused by slow network performance","B. A flaw where system behaviour depends on the timing of uncontrollable events","C. A buffer overflow triggered by large inputs","D. An SQL injection variant"],ans:"B",exp:"A race condition occurs when the outcome depends on the sequence or timing of events, which attackers can manipulate to bypass security controls."},
{id:"d2q31",domain:"D2",q:"An attacker uses publicly available tools and known exploits. Which threat actor type does this describe?",opts:["A. Nation-state","B. APT","C. Script kiddie","D. Insider"],ans:"C",exp:"Script kiddies use pre-written tools and exploits without deep technical knowledge, relying on existing attack frameworks rather than developing their own."},
{id:"d2q32",domain:"D2",q:"Which of the following BEST describes typosquatting?",opts:["A. Sending phishing emails with misspelled domains","B. Registering domain names similar to legitimate ones to capture mistyped traffic","C. Injecting scripts into web pages","D. Intercepting DNS queries"],ans:"B",exp:"Typosquatting registers domain names with common misspellings of popular sites to capture users who make typing errors."},
{id:"d2q33",domain:"D2",q:"What is the FIRST step in a typical cyber kill chain?",opts:["A. Exploitation","B. Delivery","C. Reconnaissance","D. Installation"],ans:"C",exp:"The Lockheed Martin cyber kill chain begins with Reconnaissance — gathering information about the target before the attack begins."},
{id:"d2q34",domain:"D2",q:"Which of the following BEST describes a Trojan horse?",opts:["A. Malware that self-replicates across networks","B. Malicious software disguised as legitimate software","C. Malware that encrypts files","D. Software that displays unwanted ads"],ans:"B",exp:"A Trojan horse disguises itself as legitimate software to trick users into installing it, then performs malicious actions."},
{id:"d2q35",domain:"D2",q:"What security control BEST mitigates the risk of password spraying attacks?",opts:["A. Longer password complexity requirements","B. Account lockout policies","C. Encrypting the password database","D. Using SHA-256 for password hashing"],ans:"B",exp:"Account lockout policies limit failed login attempts, making password spraying attacks (trying one password against many accounts) impractical."},
{id:"d2q36",domain:"D2",q:"Which of the following BEST describes an on-path attack?",opts:["A. An attacker physically intercepts network cables","B. An attacker positions themselves between two communicating parties","C. An attacker floods a server with traffic","D. An attacker exploits a zero-day vulnerability"],ans:"B",exp:"An on-path (formerly MITM) attack places the attacker between two communicating parties to intercept, read, or modify traffic."},
{id:"d2q37",domain:"D2",q:"What type of attack attempts every possible character combination to crack a password?",opts:["A. Dictionary attack","B. Rainbow table attack","C. Brute force attack","D. Credential stuffing"],ans:"C",exp:"A brute force attack systematically tries every possible combination of characters until the correct password is found."},
{id:"d2q38",domain:"D2",q:"Which of the following is a physical social engineering attack?",opts:["A. Phishing email","B. Tailgating","C. Smishing","D. Vishing"],ans:"B",exp:"Tailgating (piggybacking) is a physical social engineering technique where an attacker follows an authorised person through a secured door."},
{id:"d2q39",domain:"D2",q:"What does CVE stand for and what is its purpose?",opts:["A. Common Vulnerability Exposure — tracks software licenses","B. Common Vulnerabilities and Exposures — a public database of known security vulnerabilities","C. Cyber Vulnerability Engine — automated scanning tool","D. Centralised Vulnerability Enforcement — a policy framework"],ans:"B",exp:"CVE is a public database of known security vulnerabilities, providing a standardised identifier for each vulnerability."},
{id:"d2q40",domain:"D2",q:"Which of the following BEST describes shimming as an attack technique?",opts:["A. Injecting code between an application and its API to intercept calls","B. Overwriting memory buffers","C. Redirecting DNS queries","D. Hiding malware in firmware"],ans:"A",exp:"Shimming inserts a malicious layer between an application and its API calls, intercepting and modifying the data exchanged."},
{id:"d3q1",domain:"D3",q:"Which of the following BEST describes a screened subnet (DMZ)?",opts:["A. A network segment that blocks all external traffic","B. A network zone between the internet and internal network hosting public-facing services","C. A VPN concentration point","D. An isolated network for malware analysis"],ans:"B",exp:"A screened subnet (DMZ) sits between the internet and internal network, hosting public-facing services while protecting internal resources."},
{id:"d3q2",domain:"D3",q:"What is the main security benefit of network segmentation?",opts:["A. It speeds up network performance","B. It limits the lateral movement of attackers if a segment is compromised","C. It eliminates the need for firewalls","D. It provides automatic encryption of all traffic"],ans:"B",exp:"Network segmentation divides a network into isolated segments, limiting an attacker's ability to move laterally if they compromise one segment."},
{id:"d3q3",domain:"D3",q:"Which cloud service model provides the most control to the customer?",opts:["A. SaaS","B. PaaS","C. IaaS","D. FaaS"],ans:"C",exp:"IaaS (Infrastructure as a Service) gives customers control over the OS, middleware, and applications, while the provider manages physical hardware."},
{id:"d3q4",domain:"D3",q:"What is the purpose of a load balancer in a high-availability architecture?",opts:["A. To encrypt traffic between servers","B. To distribute incoming traffic across multiple servers to prevent overload","C. To filter malicious traffic","D. To provide VPN access to remote users"],ans:"B",exp:"A load balancer distributes traffic across multiple servers, ensuring no single server is overwhelmed and improving availability."},
{id:"d3q5",domain:"D3",q:"Which of the following BEST describes infrastructure as code (IaC)?",opts:["A. Writing code to exploit infrastructure vulnerabilities","B. Managing and provisioning infrastructure through machine-readable configuration files","C. Using AI to manage network infrastructure","D. Encrypting infrastructure configuration files"],ans:"B",exp:"IaC manages infrastructure through code and configuration files, enabling consistent, repeatable, and automated provisioning."},
{id:"d3q6",domain:"D3",q:"What security concern is MOST associated with container technologies like Docker?",opts:["A. Containers cannot be encrypted","B. Container escape, where an attacker breaks out of a container to access the host","C. Containers use too much bandwidth","D. Containers cannot be patched"],ans:"B",exp:"Container escape is a critical concern where a vulnerability allows code running inside a container to break out and access the underlying host system."},
{id:"d3q7",domain:"D3",q:"Which of the following BEST describes a microservices architecture from a security perspective?",opts:["A. Reduces attack surface by using a single large application","B. Increases attack surface due to more inter-service communication points","C. Eliminates the need for authentication","D. Makes patching unnecessary"],ans:"B",exp:"Microservices increase the attack surface because each service communicates over APIs, creating more potential interception and exploitation points."},
{id:"d3q8",domain:"D3",q:"What is the purpose of a CASB (Cloud Access Security Broker)?",opts:["A. To replace firewalls in cloud environments","B. To provide visibility and security controls between cloud users and cloud services","C. To encrypt all data in cloud storage","D. To manage cloud provider billing"],ans:"B",exp:"A CASB sits between users and cloud services, enforcing security policies, providing visibility, and protecting against threats."},
{id:"d3q9",domain:"D3",q:"Which of the following BEST describes a hot site in disaster recovery?",opts:["A. A backup site with no equipment installed","B. A fully operational backup site that can take over immediately","C. A site that requires 24-72 hours to become operational","D. A mobile recovery unit"],ans:"B",exp:"A hot site is a fully equipped, operational backup facility that can immediately take over operations, minimising downtime."},
{id:"d3q10",domain:"D3",q:"What is the MAIN difference between a stateful and stateless firewall?",opts:["A. Stateful firewalls are faster","B. Stateful firewalls track the state of network connections; stateless firewalls evaluate each packet independently","C. Stateless firewalls provide more security","D. Stateful firewalls cannot inspect encrypted traffic"],ans:"B",exp:"Stateful firewalls maintain a connection state table and make decisions based on connection context; stateless firewalls evaluate each packet in isolation."},
{id:"d3q11",domain:"D3",q:"Which of the following BEST describes a software-defined network (SDN)?",opts:["A. A network that uses only wireless connections","B. A network architecture separating the control plane from the data plane","C. A network secured by software-only firewalls","D. A network that runs exclusively in the cloud"],ans:"B",exp:"SDN separates the network control plane (routing decisions) from the data plane (packet forwarding), enabling centralised, programmable network management."},
{id:"d3q12",domain:"D3",q:"What is the purpose of a proxy server?",opts:["A. To provide direct connections between clients and servers","B. To act as an intermediary between clients and servers, filtering and logging traffic","C. To encrypt all network traffic","D. To assign IP addresses to devices"],ans:"B",exp:"A proxy server intercepts traffic between clients and servers, providing content filtering, caching, anonymity, and logging."},
{id:"d3q13",domain:"D3",q:"Which of the following BEST describes an air-gapped network?",opts:["A. A network that uses wireless encryption","B. A network completely isolated from external networks including the internet","C. A network protected by next-generation firewalls","D. A network using private IP addresses"],ans:"B",exp:"An air-gapped network is physically isolated from all external networks, including the internet, providing the highest level of isolation."},
{id:"d3q14",domain:"D3",q:"What is the MAIN purpose of a WAF (Web Application Firewall)?",opts:["A. To filter network-layer traffic","B. To protect web applications by filtering and monitoring HTTP traffic","C. To provide VPN connectivity","D. To manage SSL certificates"],ans:"B",exp:"A WAF monitors and filters HTTP traffic to and from a web application, protecting against XSS, SQL injection, and other application-layer attacks."},
{id:"d3q15",domain:"D3",q:"Which of the following BEST describes the shared responsibility model in cloud computing?",opts:["A. The cloud provider is responsible for all security","B. The customer is responsible for all security","C. Security responsibilities are divided between the cloud provider and customer based on the service model","D. A third-party auditor handles all security responsibilities"],ans:"C",exp:"In the shared responsibility model, providers secure the underlying infrastructure while customers are responsible for securing their data, applications, and configurations."},
{id:"d3q16",domain:"D3",q:"What type of backup captures only the data changed since the last full backup?",opts:["A. Full backup","B. Differential backup","C. Incremental backup","D. Snapshot backup"],ans:"C",exp:"Incremental backups capture only changes since the last backup (full or incremental), saving time and storage but requiring more steps for restoration."},
{id:"d3q17",domain:"D3",q:"Which of the following BEST describes a jump server (bastion host)?",opts:["A. A server used for load balancing","B. A hardened server used as a single access point to manage systems in a secure zone","C. A server that hosts web applications","D. A honeypot server"],ans:"B",exp:"A jump server is a hardened, monitored access point used to manage devices in a separate security zone, reducing attack surface."},
{id:"d3q18",domain:"D3",q:"What does RPO (Recovery Point Objective) define?",opts:["A. How quickly systems must be restored after a disaster","B. The maximum acceptable amount of data loss measured in time","C. The physical location of backup servers","D. The cost of recovery operations"],ans:"B",exp:"RPO defines the maximum tolerable data loss — if RPO is 4 hours, backups must occur at least every 4 hours."},
{id:"d3q19",domain:"D3",q:"Which protocol encrypts DNS queries to prevent eavesdropping?",opts:["A. DNSSEC","B. DoH (DNS over HTTPS)","C. HTTPS","D. TLS 1.2"],ans:"B",exp:"DNS over HTTPS (DoH) encrypts DNS queries within HTTPS traffic, preventing ISPs and attackers from observing DNS lookups."},
{id:"d3q20",domain:"D3",q:"What is the security advantage of using VLANs?",opts:["A. They encrypt traffic between network segments","B. They logically separate network traffic to limit broadcast domains and reduce attack surface","C. They replace the need for firewalls","D. They provide automatic failover"],ans:"B",exp:"VLANs logically segment networks, isolating traffic between departments or systems and reducing the impact of a breach."},
{id:"d3q21",domain:"D3",q:"Which of the following BEST describes the principle of defence in depth?",opts:["A. Using the strongest single security control available","B. Layering multiple security controls so that failure of one doesn't compromise the entire system","C. Defending the network perimeter only","D. Encrypting all data in transit and at rest"],ans:"B",exp:"Defence in depth uses multiple overlapping security layers, ensuring no single point of failure can compromise overall security."},
{id:"d3q22",domain:"D3",q:"What is the purpose of a SIEM system in a security architecture?",opts:["A. To encrypt database traffic","B. To aggregate and correlate security event logs for threat detection and response","C. To manage user access rights","D. To perform vulnerability scanning"],ans:"B",exp:"A SIEM aggregates logs from multiple sources, correlates events, and alerts on suspicious patterns for centralised security monitoring."},
{id:"d3q23",domain:"D3",q:"Which of the following BEST describes a serverless architecture from a security standpoint?",opts:["A. No security is needed as the provider handles everything","B. The customer is responsible for function code security while the provider manages infrastructure","C. Serverless eliminates all vulnerabilities","D. Serverless requires no patching"],ans:"B",exp:"In serverless, providers manage infrastructure security while customers remain responsible for securing their function code and data."},
{id:"d3q24",domain:"D3",q:"What is the purpose of network access control (NAC)?",opts:["A. To encrypt all network traffic","B. To enforce security policies on devices before granting network access","C. To monitor bandwidth usage","D. To provide DHCP services"],ans:"B",exp:"NAC evaluates devices against security policies (patching, AV status) before granting network access, preventing non-compliant devices from connecting."},
{id:"d3q25",domain:"D3",q:"Which of the following BEST describes east-west traffic in a data centre?",opts:["A. Traffic between the data centre and the internet","B. Traffic moving between servers within the data centre","C. Traffic from remote users to internal systems","D. Traffic between different cloud providers"],ans:"B",exp:"East-west traffic flows laterally between servers within a data centre, as opposed to north-south traffic which flows between internal and external networks."},
{id:"d3q26",domain:"D3",q:"What is a cold site in disaster recovery?",opts:["A. A fully operational backup facility","B. A facility with basic infrastructure but no equipment installed","C. A mobile recovery unit","D. A cloud-based backup service"],ans:"B",exp:"A cold site provides basic facilities (power, networking) but requires equipment to be installed and configured, taking days or weeks to become operational."},
{id:"d3q27",domain:"D3",q:"Which of the following BEST describes a next-generation firewall (NGFW)?",opts:["A. A firewall that only filters based on IP addresses","B. A firewall combining traditional packet filtering with application awareness and intrusion prevention","C. A firewall deployed only in cloud environments","D. A firewall that replaces antivirus software"],ans:"B",exp:"NGFWs add application-layer inspection, intrusion prevention, SSL inspection, and identity awareness to traditional firewall capabilities."},
{id:"d3q28",domain:"D3",q:"Which of the following BEST describes geo-redundancy?",opts:["A. Using multiple ISPs in one location","B. Replicating systems and data across geographically separate locations","C. Load balancing across multiple servers in one data centre","D. Backing up data to a single remote server"],ans:"B",exp:"Geo-redundancy replicates infrastructure across geographically distant locations, protecting against site-level disasters."},
{id:"d3q29",domain:"D3",q:"What is the purpose of TLS in secure web communications?",opts:["A. To filter malicious web content","B. To encrypt data in transit between a web browser and server","C. To authenticate users to web applications","D. To block SQL injection attacks"],ans:"B",exp:"TLS (Transport Layer Security) encrypts communications between clients and servers, ensuring confidentiality and integrity of data in transit."},
{id:"d3q30",domain:"D3",q:"Which of the following BEST describes a honeynet?",opts:["A. A single decoy server","B. A network of honeypots designed to simulate an entire network environment","C. A firewall rule set for trapping attackers","D. A type of IDS"],ans:"B",exp:"A honeynet is a network of interconnected honeypots that simulate a full environment, providing richer intelligence about attacker behaviour."},
{id:"d3q31",domain:"D3",q:"Which of the following BEST describes the concept of 'fail secure'?",opts:["A. Systems fail gracefully with no data loss","B. When a system fails, it defaults to a secure state denying access","C. Failed systems automatically restart","D. Security logs are preserved during system failure"],ans:"B",exp:"Fail secure means that when a system fails, it defaults to a secure state — typically denying access rather than granting it."},
{id:"d3q32",domain:"D3",q:"What is the purpose of microsegmentation in a zero trust architecture?",opts:["A. To reduce network bandwidth usage","B. To create granular security perimeters around individual workloads","C. To replace VLANs entirely","D. To encrypt inter-server traffic"],ans:"B",exp:"Microsegmentation creates fine-grained security perimeters around individual workloads, limiting lateral movement even within trusted network segments."},
{id:"d3q33",domain:"D3",q:"Which of the following BEST describes a warm site?",opts:["A. A site with full operational capability that can activate immediately","B. A partially equipped site that can be operational within hours to days","C. A site with only basic utilities and no equipment","D. A cloud-based failover service"],ans:"B",exp:"A warm site has partial infrastructure in place and can be operational within hours to days, balancing cost and recovery speed between hot and cold sites."},
{id:"d3q34",domain:"D3",q:"What security mechanism prevents users from accessing resources outside their assigned network segment?",opts:["A. Load balancing","B. Network segmentation with ACLs","C. SSL inspection","D. DNS filtering"],ans:"B",exp:"Network segmentation combined with Access Control Lists (ACLs) restricts traffic between segments, preventing unauthorised lateral movement."},
{id:"d3q35",domain:"D3",q:"Which of the following BEST describes a SAN (Storage Area Network) from a security perspective?",opts:["A. A network dedicated to email traffic","B. A high-speed dedicated network for storage that should be isolated and secured separately","C. A network that replaces traditional file servers","D. A type of cloud storage service"],ans:"B",exp:"A SAN is a dedicated high-speed network for storage access, which should be isolated and secured separately from general data networks to protect sensitive data."},
{id:"d3q36",domain:"D3",q:"What does 'immutable infrastructure' mean in cloud security?",opts:["A. Infrastructure that cannot be encrypted","B. Infrastructure components that are replaced rather than modified when changes are needed","C. Infrastructure that never requires maintenance","D. Infrastructure deployed only on-premises"],ans:"B",exp:"Immutable infrastructure replaces components entirely rather than patching them, ensuring consistency and reducing configuration drift and attack surface."},
{id:"d3q37",domain:"D3",q:"Which of the following BEST describes a deception technology?",opts:["A. Encrypting data to deceive attackers","B. Deploying fake assets like honeypots to detect and mislead attackers","C. Using fake identities for penetration testing","D. Hiding network topology from external scans"],ans:"B",exp:"Deception technology deploys decoys and traps throughout the network to detect, deflect, and study attackers without risking real assets."},
{id:"d3q38",domain:"D3",q:"What is the purpose of a reverse proxy?",opts:["A. To hide client IP addresses from servers","B. To act on behalf of servers, handling requests from the internet and forwarding to backend servers","C. To provide outbound filtering for employees","D. To encrypt DNS traffic"],ans:"B",exp:"A reverse proxy sits in front of servers, handling incoming requests, providing load balancing, SSL termination, and protection of backend infrastructure."},
{id:"d3q39",domain:"D3",q:"Which of the following BEST describes software-defined perimeter (SDP)?",opts:["A. A firewall policy written in software","B. A security model that dynamically creates one-to-one encrypted connections based on identity","C. A network segmentation tool","D. A cloud-based WAF"],ans:"B",exp:"SDP (also called 'black cloud') creates dynamic, identity-based encrypted connections, making infrastructure invisible to unauthorised users."},
{id:"d3q40",domain:"D3",q:"Which of the following BEST describes the purpose of network flow analysis?",opts:["A. To encrypt network traffic","B. To monitor traffic patterns and detect anomalies without examining packet contents","C. To block malicious traffic in real time","D. To manage IP address assignments"],ans:"B",exp:"Network flow analysis examines metadata about traffic flows (source, destination, volume, timing) to detect anomalies without deep packet inspection."},
{id:"d4q1",domain:"D4",q:"Which phase of the NIST incident response lifecycle involves restoring systems to normal operation?",opts:["A. Detection and Analysis","B. Containment","C. Eradication","D. Recovery"],ans:"D",exp:"The Recovery phase restores systems to normal operation after eradication, including restoring from backups and verifying system integrity."},
{id:"d4q2",domain:"D4",q:"What is the PRIMARY purpose of a vulnerability assessment?",opts:["A. To actively exploit identified vulnerabilities","B. To identify, quantify, and prioritise vulnerabilities in a system","C. To train users on security awareness","D. To monitor network traffic for anomalies"],ans:"B",exp:"A vulnerability assessment identifies and prioritises security weaknesses so they can be remediated before attackers exploit them."},
{id:"d4q3",domain:"D4",q:"Which tool is used to capture and analyse network packets?",opts:["A. Nessus","B. Nmap","C. Wireshark","D. Metasploit"],ans:"C",exp:"Wireshark is a packet capture and analysis tool that captures network traffic for detailed examination of protocols and data."},
{id:"d4q4",domain:"D4",q:"What does the term 'chain of custody' mean in digital forensics?",opts:["A. The encryption applied to forensic evidence","B. The documented history of evidence from collection through court presentation","C. The chain of command in an incident response team","D. The process of hashing forensic images"],ans:"B",exp:"Chain of custody documents who handled evidence, when, and how, ensuring its integrity and admissibility in legal proceedings."},
{id:"d4q5",domain:"D4",q:"Which of the following BEST describes threat hunting?",opts:["A. Waiting for SIEM alerts before investigating","B. Proactively searching for hidden threats that have evaded automated detection","C. Running vulnerability scans against external systems","D. Responding to phishing reports from users"],ans:"B",exp:"Threat hunting proactively searches for threats already inside the environment that have bypassed automated detection systems."},
{id:"d4q6",domain:"D4",q:"What is the purpose of a playbook in incident response?",opts:["A. To document the history of all security incidents","B. To provide step-by-step procedures for responding to specific types of incidents","C. To store forensic evidence","D. To define the organisation's security architecture"],ans:"B",exp:"Playbooks provide predefined, step-by-step response procedures for specific incident types, ensuring consistent and effective responses."},
{id:"d4q7",domain:"D4",q:"Which of the following BEST describes the order of volatility in digital forensics?",opts:["A. Evidence should be collected from least volatile to most volatile","B. Evidence should be collected from most volatile to least volatile","C. All evidence should be collected simultaneously","D. Volatility does not affect collection order"],ans:"B",exp:"Evidence should be collected from most volatile (RAM, network connections) to least volatile (disk, backups) to preserve ephemeral data."},
{id:"d4q8",domain:"D4",q:"What is the purpose of endpoint detection and response (EDR)?",opts:["A. To replace traditional antivirus entirely","B. To provide continuous monitoring and response capabilities on endpoints","C. To manage patch deployment to endpoints","D. To encrypt endpoint hard drives"],ans:"B",exp:"EDR provides real-time monitoring, threat detection, and automated or manual response capabilities on endpoint devices."},
{id:"d4q9",domain:"D4",q:"Which of the following BEST describes a tabletop exercise?",opts:["A. A physical simulation of an attack on the organisation's systems","B. A discussion-based exercise where participants talk through a scenario without taking action","C. A penetration test performed by an internal team","D. A backup restoration test"],ans:"B",exp:"A tabletop exercise is a discussion-based simulation where participants talk through their response to a scenario, identifying gaps without disrupting operations."},
{id:"d4q10",domain:"D4",q:"What does MTTR measure in security operations?",opts:["A. The average time between system failures","B. The average time to restore a system after a failure","C. The maximum tolerable downtime","D. The time to detect a security incident"],ans:"B",exp:"MTTR (Mean Time to Repair/Recover) measures the average time taken to restore a system to normal operation after a failure or incident."},
{id:"d4q11",domain:"D4",q:"Which of the following is a key difference between an IDS and an IPS?",opts:["A. An IDS encrypts traffic; an IPS does not","B. An IDS detects and alerts on threats; an IPS can actively block them","C. An IPS is passive; an IDS is active","D. They are functionally identical"],ans:"B",exp:"An IDS (Intrusion Detection System) alerts on detected threats; an IPS (Intrusion Prevention System) can actively block malicious traffic inline."},
{id:"d4q12",domain:"D4",q:"What is the purpose of log management in security operations?",opts:["A. To reduce network bandwidth","B. To collect, store, and analyse logs for security events and compliance","C. To automatically patch vulnerabilities","D. To monitor physical access to server rooms"],ans:"B",exp:"Log management centralises collection and storage of logs from across the environment, enabling security analysis, incident investigation, and compliance reporting."},
{id:"d4q13",domain:"D4",q:"Which of the following BEST describes a false positive in security monitoring?",opts:["A. A real threat that goes undetected","B. An alert triggered by benign activity that resembles malicious behaviour","C. A missed intrusion that causes damage","D. A vulnerability that cannot be exploited"],ans:"B",exp:"A false positive is a security alert generated for legitimate, non-malicious activity, wasting analyst time and potentially leading to alert fatigue."},
{id:"d4q14",domain:"D4",q:"What is the purpose of application whitelisting?",opts:["A. To allow all applications to run unless explicitly blocked","B. To allow only approved applications to execute on a system","C. To encrypt application data","D. To monitor application performance"],ans:"B",exp:"Application whitelisting permits only pre-approved applications to run, preventing unauthorised or malicious software from executing."},
{id:"d4q15",domain:"D4",q:"Which of the following BEST describes continuous monitoring?",opts:["A. Running monthly vulnerability scans","B. Ongoing, real-time collection and analysis of security data across the environment","C. Reviewing security logs weekly","D. Annual penetration testing"],ans:"B",exp:"Continuous monitoring provides real-time visibility into the security posture of an organisation through constant data collection and analysis."},
{id:"d4q16",domain:"D4",q:"What is the purpose of a data loss prevention (DLP) tool?",opts:["A. To back up data to prevent loss","B. To detect and prevent unauthorised transmission of sensitive data","C. To encrypt data in transit","D. To recover deleted files"],ans:"B",exp:"DLP tools monitor, detect, and block the unauthorised exfiltration of sensitive data, whether via email, web upload, or removable media."},
{id:"d4q17",domain:"D4",q:"Which of the following BEST describes the containment phase of incident response?",opts:["A. Identifying the root cause of the incident","B. Limiting the spread and impact of an incident without necessarily eliminating it","C. Restoring systems to normal operation","D. Documenting lessons learned"],ans:"B",exp:"Containment aims to limit the damage and prevent the incident from spreading while investigation and eradication are planned."},
{id:"d4q18",domain:"D4",q:"What is the purpose of a security baseline?",opts:["A. To define the minimum acceptable security configuration for a system","B. To document all known vulnerabilities in the environment","C. To establish incident response procedures","D. To set firewall rules"],ans:"A",exp:"A security baseline defines the minimum security configuration standard that all systems must meet, ensuring a consistent security posture."},
{id:"d4q19",domain:"D4",q:"Which of the following tools is primarily used for network discovery and port scanning?",opts:["A. Wireshark","B. Metasploit","C. Nmap","D. Nessus"],ans:"C",exp:"Nmap (Network Mapper) is a widely used tool for network discovery, host detection, and port/service scanning."},
{id:"d4q20",domain:"D4",q:"What is the PRIMARY goal of the eradication phase in incident response?",opts:["A. Notifying affected users","B. Removing the root cause of the incident from the environment","C. Restoring systems from backup","D. Documenting the incident timeline"],ans:"B",exp:"Eradication removes the root cause — malware, backdoors, compromised accounts — to ensure the threat is fully eliminated before recovery."},
{id:"d4q21",domain:"D4",q:"Which of the following BEST describes user and entity behaviour analytics (UEBA)?",opts:["A. A tool that monitors network perimeter traffic","B. A system that detects anomalous behaviour by comparing activity to established baselines","C. A vulnerability scanning tool","D. A patch management solution"],ans:"B",exp:"UEBA uses machine learning to establish behavioural baselines and detect anomalies in user and entity behaviour that may indicate threats."},
{id:"d4q22",domain:"D4",q:"What does patch management primarily aim to achieve?",opts:["A. To monitor network traffic","B. To remediate known vulnerabilities by applying software updates","C. To enforce access control policies","D. To back up system configurations"],ans:"B",exp:"Patch management systematically applies software updates to remediate known vulnerabilities, reducing the attack surface."},
{id:"d4q23",domain:"D4",q:"Which of the following BEST describes a red team exercise?",opts:["A. A defensive team monitoring security controls","B. An offensive team simulating real-world attacks against the organisation","C. A team reviewing security policies","D. An external audit of security controls"],ans:"B",exp:"A red team simulates adversary tactics and techniques to test the organisation's defences through realistic attack scenarios."},
{id:"d4q24",domain:"D4",q:"What is the purpose of a security orchestration, automation, and response (SOAR) platform?",opts:["A. To replace SIEM systems","B. To automate repetitive security tasks and coordinate incident response workflows","C. To scan for vulnerabilities automatically","D. To manage firewall rules"],ans:"B",exp:"SOAR automates repetitive security tasks (like alert triage), orchestrates tools, and streamlines incident response workflows to improve efficiency."},
{id:"d4q25",domain:"D4",q:"Which of the following BEST describes the purpose of a security awareness training programme?",opts:["A. To teach employees technical hacking skills","B. To reduce human risk by educating staff on security threats and safe behaviours","C. To train the security team on incident response","D. To certify employees in cybersecurity"],ans:"B",exp:"Security awareness training reduces the risk of human error and social engineering by educating all employees on threats, policies, and safe practices."},
{id:"d4q26",domain:"D4",q:"What is the primary purpose of digital forensics in incident response?",opts:["A. To prevent future incidents","B. To collect, preserve, and analyse evidence to understand what happened and support legal proceedings","C. To restore systems after an incident","D. To notify affected parties"],ans:"B",exp:"Digital forensics collects and preserves evidence to reconstruct events, attribute actions, and support potential legal or disciplinary proceedings."},
{id:"d4q27",domain:"D4",q:"Which of the following BEST describes a purple team exercise?",opts:["A. A combined red and blue team working together to improve defences","B. An external penetration test","C. A government-led security audit","D. A disaster recovery test"],ans:"A",exp:"A purple team combines red (offensive) and blue (defensive) team activities collaboratively, with red sharing techniques so blue can improve detection and response."},
{id:"d4q28",domain:"D4",q:"What is the purpose of network traffic analysis (NTA)?",opts:["A. To encrypt network communications","B. To monitor and analyse network traffic to detect threats and anomalies","C. To assign IP addresses to devices","D. To manage firewall rules"],ans:"B",exp:"NTA monitors network traffic patterns to detect threats, anomalies, and malicious activity that may not trigger traditional signature-based alerts."},
{id:"d4q29",domain:"D4",q:"Which of the following BEST describes an indicator of compromise (IoC)?",opts:["A. A policy defining acceptable use","B. Evidence that a system may have been compromised, such as malicious IPs or file hashes","C. A vulnerability in a system","D. A security control failure"],ans:"B",exp:"An IoC is forensic evidence — malicious IPs, file hashes, registry keys — suggesting a system has been or may be compromised."},
{id:"d4q30",domain:"D4",q:"What does the term 'mean time to detect (MTTD)' measure?",opts:["A. How long it takes to recover from an incident","B. The average time between discovering a vulnerability and patching it","C. The average time from when an incident occurs to when it is detected","D. How long a system is unavailable during maintenance"],ans:"C",exp:"MTTD measures the average time from when an incident actually begins to when it is detected by the security team."},
{id:"d4q31",domain:"D4",q:"Which of the following BEST describes the purpose of sanitising media before disposal?",opts:["A. To physically destroy the device","B. To ensure data cannot be recovered from disposed storage media","C. To transfer data to a new device","D. To encrypt the media"],ans:"B",exp:"Media sanitisation ensures residual data cannot be recovered from disposed storage, preventing data breaches from discarded equipment."},
{id:"d4q32",domain:"D4",q:"What is the purpose of a CSIRT (Computer Security Incident Response Team)?",opts:["A. To perform routine vulnerability scans","B. To coordinate and manage the response to security incidents","C. To develop security policies","D. To manage user access rights"],ans:"B",exp:"A CSIRT is a dedicated team responsible for coordinating, managing, and responding to security incidents within an organisation."},
{id:"d4q33",domain:"D4",q:"Which of the following BEST describes the concept of least functionality?",opts:["A. Using the cheapest security tools available","B. Configuring systems with only the services and features required for their purpose","C. Granting users minimum permissions","D. Using minimal encryption standards"],ans:"B",exp:"Least functionality removes unnecessary services, ports, and features from systems, reducing the attack surface to only what is needed."},
{id:"d4q34",domain:"D4",q:"What is the purpose of a canary token in security operations?",opts:["A. To encrypt sensitive files","B. To detect unauthorised access by triggering an alert when a decoy resource is accessed","C. To monitor user behaviour analytics","D. To perform automated patching"],ans:"B",exp:"Canary tokens are tripwires — decoy resources that trigger alerts when accessed, revealing unauthorised activity or data exfiltration."},
{id:"d4q35",domain:"D4",q:"Which of the following BEST describes security orchestration?",opts:["A. Manually responding to each security alert","B. Connecting and coordinating security tools to automate workflows and responses","C. Organising the security team hierarchy","D. Scheduling vulnerability scans"],ans:"B",exp:"Security orchestration integrates multiple security tools and automates workflows, enabling faster and more consistent incident response."},
{id:"d4q36",domain:"D4",q:"What is the purpose of a post-incident review (lessons learned)?",opts:["A. To assign blame for the incident","B. To identify improvements to prevent recurrence and enhance the response process","C. To document financial losses","D. To notify regulators of the incident"],ans:"B",exp:"Post-incident reviews identify what went well, what failed, and what improvements should be made to strengthen future responses."},
{id:"d4q37",domain:"D4",q:"Which of the following BEST describes the purpose of mobile device management (MDM)?",opts:["A. To track the physical location of mobile devices only","B. To enforce security policies, manage configurations, and enable remote wipe of mobile devices","C. To provide VPN access to mobile users","D. To monitor mobile data usage"],ans:"B",exp:"MDM enforces security policies (encryption, screen lock), manages app deployment, and enables remote wipe of lost or stolen devices."},
{id:"d4q38",domain:"D4",q:"What is the primary purpose of a security configuration management (SCM) tool?",opts:["A. To monitor network traffic","B. To ensure systems are configured in accordance with security baselines and detect drift","C. To perform penetration testing","D. To manage user authentication"],ans:"B",exp:"SCM tools continuously check system configurations against approved baselines and alert on or remediate configuration drift."},
{id:"d4q39",domain:"D4",q:"Which of the following BEST describes threat modelling?",opts:["A. Building 3D models of network infrastructure","B. Systematically identifying potential threats and vulnerabilities to a system during design","C. Monitoring live threats in a SIEM","D. Creating phishing simulations"],ans:"B",exp:"Threat modelling is a structured process to identify potential threats during design, enabling proactive security controls to be built in from the start."},
{id:"d4q40",domain:"D4",q:"What is the purpose of an after-action report following a penetration test?",opts:["A. To bill the client for the engagement","B. To document findings, exploited vulnerabilities, and recommended remediation steps","C. To record the test methodology only","D. To certify the system as secure"],ans:"B",exp:"An after-action (penetration test) report details vulnerabilities found, how they were exploited, their severity, and specific remediation recommendations."},
{id:"d5q1",domain:"D5",q:"What does a data classification policy define?",opts:["A. How data is encrypted","B. Categories of data sensitivity and corresponding handling requirements","C. Who can access data systems","D. How long data is retained"],ans:"B",exp:"A data classification policy defines sensitivity categories (e.g. Public, Internal, Confidential) and specifies how each category must be handled, stored, and shared."},
{id:"d5q2",domain:"D5",q:"Which regulation specifically governs the handling of personal data of EU residents?",opts:["A. HIPAA","B. PCI DSS","C. GDPR","D. SOX"],ans:"C",exp:"GDPR (General Data Protection Regulation) governs the processing and protection of personal data of individuals in the EU and EEA."},
{id:"d5q3",domain:"D5",q:"What is the purpose of a risk register?",opts:["A. To log all security incidents","B. To document identified risks, their likelihood, impact, and treatment status","C. To track vulnerability remediation","D. To record compliance audit findings"],ans:"B",exp:"A risk register is a document that records identified risks, their assessment (likelihood and impact), owner, and current treatment status."},
{id:"d5q4",domain:"D5",q:"Which of the following BEST describes risk acceptance?",opts:["A. Implementing controls to reduce risk","B. Transferring risk to a third party","C. Acknowledging a risk and choosing not to act on it","D. Eliminating the risk entirely"],ans:"C",exp:"Risk acceptance is a risk treatment where management acknowledges the risk and decides not to mitigate it, accepting the potential consequences."},
{id:"d5q5",domain:"D5",q:"What does PCI DSS primarily govern?",opts:["A. Protection of healthcare records","B. Security of payment card data","C. Privacy of EU residents' data","D. Security of US government systems"],ans:"B",exp:"PCI DSS (Payment Card Industry Data Security Standard) defines security requirements for organisations that handle payment card data."},
{id:"d5q6",domain:"D5",q:"Which of the following BEST describes a security policy?",opts:["A. A technical configuration applied to a firewall","B. A high-level document stating management's intent and direction for information security","C. A step-by-step procedure for responding to incidents","D. A list of approved software applications"],ans:"B",exp:"A security policy is a high-level document expressing management's intent and commitment to information security, forming the foundation for all security practices."},
{id:"d5q7",domain:"D5",q:"What is the purpose of a third-party risk assessment?",opts:["A. To assess an organisation's internal security controls","B. To evaluate the security posture of vendors and partners who have access to systems or data","C. To perform penetration testing on third-party systems","D. To review contracts with cloud providers"],ans:"B",exp:"Third-party risk assessments evaluate the security controls of vendors and partners to ensure they don't introduce unacceptable risk to the organisation."},
{id:"d5q8",domain:"D5",q:"Which of the following BEST describes a data retention policy?",opts:["A. How data is encrypted at rest","B. How long different categories of data must be kept and when they should be destroyed","C. Who is authorised to access sensitive data","D. How data is backed up"],ans:"B",exp:"A data retention policy specifies retention periods for different data types based on legal, regulatory, and business requirements, and how data should be destroyed."},
{id:"d5q9",domain:"D5",q:"What is the purpose of a security audit?",opts:["A. To test whether systems can be exploited","B. To independently verify that security controls are in place and operating effectively","C. To scan systems for vulnerabilities","D. To respond to a security incident"],ans:"B",exp:"A security audit independently assesses whether security controls comply with policies, standards, and regulations, and operate as intended."},
{id:"d5q10",domain:"D5",q:"Which of the following BEST describes quantitative risk analysis?",opts:["A. Using descriptive labels (High, Medium, Low) to assess risk","B. Using numerical values and financial figures to calculate risk","C. Consulting expert opinion to estimate risk","D. Comparing risks to industry benchmarks"],ans:"B",exp:"Quantitative risk analysis assigns numerical values to risk likelihood and impact, calculating financial metrics like ALE (Annual Loss Expectancy)."},
{id:"d5q11",domain:"D5",q:"What does ALE stand for and how is it calculated?",opts:["A. Annual Loss Expectancy = SLE × ARO","B. Asset Loss Evaluation = Asset Value × Threat Factor","C. Actual Loss Estimate = Total Losses / Years","D. Average Loss Exposure = Risk Rating × Controls"],ans:"A",exp:"ALE (Annual Loss Expectancy) = Single Loss Expectancy (SLE) × Annual Rate of Occurrence (ARO), representing expected annual financial loss from a risk."},
{id:"d5q12",domain:"D5",q:"Which of the following BEST describes the purpose of security awareness training?",opts:["A. To teach technical skills to the security team","B. To reduce human-related security risks across all staff","C. To certify employees as security professionals","D. To replace technical security controls"],ans:"B",exp:"Security awareness training educates all employees on security threats and safe practices, reducing the risk of human error and social engineering."},
{id:"d5q13",domain:"D5",q:"What is the purpose of a privacy impact assessment (PIA)?",opts:["A. To assess financial risks of data breaches","B. To identify and mitigate privacy risks before implementing new systems or processes","C. To comply with PCI DSS requirements","D. To document data breach notifications"],ans:"B",exp:"A PIA identifies privacy risks in proposed systems or processes, enabling organisations to address them before deployment rather than retroactively."},
{id:"d5q14",domain:"D5",q:"Which of the following BEST describes a memorandum of understanding (MOU)?",opts:["A. A legally binding contract with financial penalties","B. A non-binding agreement expressing intent to work together","C. A document defining data handling requirements","D. A vendor security assessment form"],ans:"B",exp:"An MOU is a non-binding document expressing mutual intent and general terms of a relationship, less formal than a legally enforceable contract."},
{id:"d5q15",domain:"D5",q:"What is the purpose of a vendor due diligence process?",opts:["A. To negotiate lower prices with vendors","B. To evaluate a vendor's financial stability, security practices, and reliability before engagement","C. To monitor vendor performance after contract signing","D. To audit vendor financial statements"],ans:"B",exp:"Vendor due diligence investigates a potential vendor's security posture, financial health, and reliability before establishing a business relationship."},
{id:"d5q16",domain:"D5",q:"Which of the following BEST describes qualitative risk analysis?",opts:["A. Using financial calculations to quantify risk","B. Using descriptive scales and expert judgement to assess and prioritise risk","C. Scanning systems to identify vulnerabilities","D. Calculating ALE for each identified risk"],ans:"B",exp:"Qualitative risk analysis uses descriptive scales (High/Medium/Low) and expert judgement rather than precise financial figures to assess risk."},
{id:"d5q17",domain:"D5",q:"What does HIPAA primarily protect?",opts:["A. Financial data of US taxpayers","B. Protected health information (PHI) of patients","C. Personal data of EU residents","D. Credit card data"],ans:"B",exp:"HIPAA (Health Insurance Portability and Accountability Act) protects the privacy and security of Protected Health Information (PHI) in the US."},
{id:"d5q18",domain:"D5",q:"Which of the following BEST describes a right to erasure under GDPR?",opts:["A. The right to request a copy of personal data held","B. The right to have personal data deleted under certain circumstances","C. The right to correct inaccurate personal data","D. The right to be notified of data breaches"],ans:"B",exp:"The right to erasure ('right to be forgotten') allows individuals to request deletion of their personal data under specific circumstances defined in GDPR."},
{id:"d5q19",domain:"D5",q:"What is the purpose of a business impact analysis (BIA)?",opts:["A. To calculate the return on investment of security controls","B. To identify critical business functions and the impact of their disruption","C. To assess vendor security risks","D. To define incident response procedures"],ans:"B",exp:"A BIA identifies critical business functions, their dependencies, and the financial and operational impact of disruption to prioritise recovery efforts."},
{id:"d5q20",domain:"D5",q:"Which of the following BEST describes a compensating control?",opts:["A. A control that prevents a risk from occurring","B. An alternative control used when a primary control cannot be implemented","C. A control that detects security incidents","D. A control mandated by regulation"],ans:"B",exp:"A compensating control is an alternative security measure used when the preferred control isn't feasible, providing equivalent protection."},
{id:"d5q21",domain:"D5",q:"What is the purpose of separation of duties?",opts:["A. To ensure all employees are cross-trained","B. To prevent any single individual from having enough access to commit fraud or error undetected","C. To separate IT and security teams","D. To divide network segments"],ans:"B",exp:"Separation of duties distributes critical tasks among multiple people, preventing any individual from being able to commit and conceal fraud or error alone."},
{id:"d5q22",domain:"D5",q:"Which of the following BEST describes a mandatory access control (MAC) model?",opts:["A. Users control access to their own resources","B. Access is determined by the system based on security labels and clearances","C. Access is based on job roles","D. Access is granted based on time of day"],ans:"B",exp:"In MAC, the system enforces access based on security classifications and user clearances — users cannot override these controls."},
{id:"d5q23",domain:"D5",q:"What is the purpose of a security framework?",opts:["A. To provide technical firewall configurations","B. To provide a structured set of guidelines and best practices for managing security","C. To define employee job descriptions","D. To replace regulatory compliance requirements"],ans:"B",exp:"A security framework (like NIST CSF or ISO 27001) provides a structured approach to managing information security risk aligned with business objectives."},
{id:"d5q24",domain:"D5",q:"Which of the following BEST describes the purpose of an NDA (Non-Disclosure Agreement)?",opts:["A. To define service level expectations","B. To legally protect confidential information shared between parties","C. To establish incident response responsibilities","D. To define data retention requirements"],ans:"B",exp:"An NDA is a legally binding agreement preventing parties from disclosing confidential information shared during business relationships."},
{id:"d5q25",domain:"D5",q:"What does NIST SP 800-53 provide?",opts:["A. A guide to network architecture","B. A catalogue of security and privacy controls for federal information systems","C. Encryption standards for US government","D. Incident response procedures for healthcare"],ans:"B",exp:"NIST SP 800-53 provides a comprehensive catalogue of security and privacy controls for US federal information systems and organisations."},
{id:"d5q26",domain:"D5",q:"Which of the following BEST describes risk transference?",opts:["A. Eliminating the risk through technical controls","B. Shifting the financial impact of a risk to a third party, such as through insurance","C. Accepting the risk without action","D. Reducing the likelihood of a risk occurring"],ans:"B",exp:"Risk transference shifts the financial consequences of a risk to a third party — typically through insurance or contractual obligations."},
{id:"d5q27",domain:"D5",q:"What is the purpose of a SOC 2 report?",opts:["A. To certify a payment card processing environment","B. To assess a service organisation's controls related to security, availability, and confidentiality","C. To verify HIPAA compliance","D. To audit an organisation's financial statements"],ans:"B",exp:"SOC 2 reports assess a service organisation's controls across the Trust Service Criteria (security, availability, processing integrity, confidentiality, privacy)."},
{id:"d5q28",domain:"D5",q:"Which of the following BEST describes a data processor under GDPR?",opts:["A. An organisation that determines the purpose of data processing","B. An organisation that processes personal data on behalf of a data controller","C. A regulator that enforces data protection laws","D. An employee who handles personal data"],ans:"B",exp:"A data processor processes personal data on behalf of a data controller, following the controller's instructions and subject to GDPR obligations."},
{id:"d5q29",domain:"D5",q:"What is the purpose of job rotation as a security control?",opts:["A. To ensure employees develop multiple skills","B. To reduce insider threat risk by preventing long-term concentration of sensitive access","C. To comply with employment law requirements","D. To reduce training costs"],ans:"B",exp:"Job rotation reduces insider threat risk and fraud by ensuring no single employee has prolonged, exclusive access to sensitive systems or processes."},
{id:"d5q30",domain:"D5",q:"Which of the following BEST describes a security operations centre (SOC)?",opts:["A. A physical room containing security equipment","B. A team that continuously monitors, detects, and responds to security threats","C. A tool for managing security policies","D. An external audit function"],ans:"B",exp:"A SOC is a centralised function (team, tools, and processes) that continuously monitors, detects, analyses, and responds to security threats."},
{id:"d5q31",domain:"D5",q:"What is the purpose of an acceptable use policy (AUP)?",opts:["A. To define technical security configurations","B. To define what users may and may not do with organisational IT resources","C. To document incident response procedures","D. To establish vendor security requirements"],ans:"B",exp:"An AUP defines acceptable and unacceptable use of organisational IT resources, establishing boundaries for employee behaviour."},
{id:"d5q32",domain:"D5",q:"Which of the following BEST describes a pen test rules of engagement document?",opts:["A. A document defining financial terms of the engagement","B. A document defining the scope, boundaries, and authorised activities for a penetration test","C. A report of findings from the penetration test","D. A legal waiver for the penetration tester"],ans:"B",exp:"Rules of engagement define exactly what is in scope, which systems can be tested, what techniques are permitted, and timing constraints for a penetration test."},
{id:"d5q33",domain:"D5",q:"What is the purpose of a continuous compliance programme?",opts:["A. To perform annual compliance audits only","B. To maintain ongoing adherence to regulatory and policy requirements rather than point-in-time checks","C. To automate all security controls","D. To replace the need for security policies"],ans:"B",exp:"Continuous compliance ensures organisations maintain regulatory and policy adherence on an ongoing basis rather than preparing only for scheduled audits."},
{id:"d5q34",domain:"D5",q:"Which of the following BEST describes a data sovereignty concern?",opts:["A. Who owns the intellectual property of data","B. The requirement that data must be stored and processed within a specific country's jurisdiction","C. The right of employees to access their own HR data","D. Data ownership disputes between organisations"],ans:"B",exp:"Data sovereignty concerns arise when legal requirements mandate that data must remain within specific national borders, affecting cloud storage decisions."},
{id:"d5q35",domain:"D5",q:"What is the purpose of a penetration testing authorisation letter?",opts:["A. To certify the penetration tester's qualifications","B. To provide written authorisation for the penetration test to prevent legal issues","C. To define the test methodology","D. To document financial terms"],ans:"B",exp:"An authorisation letter provides written permission for the penetration test, protecting the tester from legal liability and defining the authorised scope."},
{id:"d5q36",domain:"D5",q:"Which of the following BEST describes the purpose of security metrics?",opts:["A. To justify security team headcount","B. To measure the effectiveness of security controls and communicate security posture to management","C. To replace security policies","D. To automate security reporting"],ans:"B",exp:"Security metrics quantify the effectiveness of security controls and provide management with data-driven insights to make informed security decisions."},
{id:"d5q37",domain:"D5",q:"What is the MAIN purpose of a vulnerability disclosure programme?",opts:["A. To publicly expose all organisational vulnerabilities","B. To provide a structured way for external researchers to report vulnerabilities responsibly","C. To automatically patch reported vulnerabilities","D. To reward employees for finding internal vulnerabilities"],ans:"B",exp:"A vulnerability disclosure programme gives external security researchers a legitimate, structured channel to report vulnerabilities, enabling faster remediation."},
{id:"d5q38",domain:"D5",q:"Which of the following BEST describes a data steward?",opts:["A. The person who owns the data and determines its use","B. The person responsible for the day-to-day management and quality of a specific data set","C. The IT administrator who backs up data","D. The legal counsel responsible for data compliance"],ans:"B",exp:"A data steward manages the day-to-day handling, quality, and compliance of specific data sets on behalf of the data owner."},
{id:"d5q39",domain:"D5",q:"What is the purpose of a security charter?",opts:["A. To define technical firewall configurations","B. To formally establish the security programme's authority, scope, and responsibilities","C. To document security incidents","D. To define employee acceptable use"],ans:"B",exp:"A security charter formally establishes the security programme, defining its authority, scope, objectives, and leadership responsibilities within the organisation."},
{id:"d5q40",domain:"D5",q:"Which of the following BEST describes the purpose of an information security management system (ISMS)?",opts:["A. A software tool for managing security alerts","B. A systematic framework for managing information security risks across an organisation","C. A database of known vulnerabilities","D. A set of firewall rules"],ans:"B",exp:"An ISMS (as defined in ISO 27001) is a systematic, risk-based framework for establishing, implementing, maintaining, and improving information security."},
];

function buildExam() {
  const exam = [];
  DOMAINS.forEach(d => {
    const pool = ALL_QUESTIONS.filter(q => q.domain === d.id).sort(() => Math.random() - 0.5);
    const count = Math.round((d.weight / 100) * 90);
    exam.push(...pool.slice(0, Math.min(count, pool.length)));
  });
  return exam.sort(() => Math.random() - 0.5).slice(0, 90);
}

function load(key, def) { try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : def; } catch { return def; } }
function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }

function getDayNumber() {
  const diff = Math.floor((new Date() - new Date(START_DATE)) / 86400000);
  return Math.min(Math.max(diff + 1, 1), 23);
}

function getWeakestDomain(stats) {
  const scored = DOMAINS.map(d => { const s = stats[d.id] || { correct: 0, total: 0 }; return { id: d.id, pct: s.total > 0 ? (s.correct / s.total) * 100 : -1 }; }).filter(d => d.pct >= 0);
  if (!scored.length) return null;
  return scored.reduce((a, b) => a.pct < b.pct ? a : b).id;
}

function pickDomain(stats) {
  const weights = DOMAINS.map(d => { const s = stats[d.id] || { correct: 0, total: 0 }; const acc = s.total > 0 ? s.correct / s.total : 0.5; return { id: d.id, w: (d.weight / 100) + (1 - acc) * 0.3 }; });
  const total = weights.reduce((s, d) => s + d.w, 0);
  let r = Math.random() * total;
  for (const d of weights) { r -= d.w; if (r <= 0) return d.id; }
  return weights[weights.length - 1].id;
}

const bg = "#0a0f1e", card = "#111827", border = "#1f2937";

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [stats, setStats] = useState(() => load("sy0701_stats", {}));
  const [dailyDone, setDailyDone] = useState(() => load("sy0701_daily", 0));
  const [answeredIds, setAnsweredIds] = useState(() => load("sy0701_answered", []));
  const [failedQs, setFailedQs] = useState(() => load("sy0701_failed", []));

  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [sessionQueue, setSessionQueue] = useState([]);
  const [sessionIdx, setSessionIdx] = useState(0);
  const [mode, setMode] = useState("practice");
  const [examAnswers, setExamAnswers] = useState([]);

  const saveStats = useCallback((s) => { setStats(s); save("sy0701_stats", s); }, []);
  const saveDailyDone = useCallback((n) => { setDailyDone(n); save("sy0701_daily", n); }, []);
  const saveAnsweredIds = useCallback((ids) => { setAnsweredIds(ids); save("sy0701_answered", ids); }, []);
  const saveFailedQs = useCallback((qs) => { setFailedQs(qs); save("sy0701_failed", qs); }, []);

  function buildPracticeQueue() {
    const answered = new Set(answeredIds);
    const domain = pickDomain(stats);
    let pool = ALL_QUESTIONS.filter(q => q.domain === domain && !answered.has(q.id));
    if (pool.length < 10) {
      const extra = ALL_QUESTIONS.filter(q => !answered.has(q.id) && q.domain !== domain);
      pool = [...pool, ...extra];
    }
    if (pool.length < 10) {
      pool = ALL_QUESTIONS.filter(q => q.domain === domain);
    }
    return pool.sort(() => Math.random() - 0.5).slice(0, 10);
  }

  function startPractice() {
    const queue = buildPracticeQueue();
    setSessionQueue(queue);
    setSessionIdx(0);
    setQuestion(queue[0]);
    setSelected(null);
    setFeedback(null);
    setMode("practice");
    setTab("quiz");
  }

  function startReview() {
    if (failedQs.length === 0) return;
    const queue = [...failedQs].sort(() => Math.random() - 0.5);
    setSessionQueue(queue);
    setSessionIdx(0);
    setQuestion(queue[0]);
    setSelected(null);
    setFeedback(null);
    setMode("review");
    setTab("quiz");
  }

  function startExam() {
    const queue = buildExam();
    setSessionQueue(queue);
    setSessionIdx(0);
    setQuestion(queue[0]);
    setSelected(null);
    setFeedback(null);
    setExamAnswers([]);
    setMode("exam");
    setTab("quiz");
  }

  function handleAnswer(letter) {
    if (selected || !question) return;
    setSelected(letter);
    const correct = letter === question.ans;

    if (mode !== "exam") {
      const newStats = { ...stats };
      if (!newStats[question.domain]) newStats[question.domain] = { correct: 0, total: 0 };
      newStats[question.domain].total += 1;
      if (correct) newStats[question.domain].correct += 1;
      saveStats(newStats);
      const newAnswered = [...new Set([...answeredIds, question.id])];
      saveAnsweredIds(newAnswered);
      if (!correct) {
        if (!failedQs.find(q => q.id === question.id)) saveFailedQs([...failedQs, { ...question }]);
      } else if (mode === "review") {
        saveFailedQs(failedQs.filter(q => q.id !== question.id));
      }
      saveDailyDone(dailyDone + 1);
    } else {
      setExamAnswers(prev => [...prev, { id: question.id, domain: question.domain, correct, selected: letter, ans: question.ans, q: question.q, exp: question.exp }]);
    }
    setFeedback({ correct, explanation: question.exp, correctLetter: question.ans });
  }

  function handleNext() {
    const nextIdx = sessionIdx + 1;
    if (nextIdx >= sessionQueue.length) {
      setTab("results");
      return;
    }
    setSessionIdx(nextIdx);
    setQuestion(sessionQueue[nextIdx]);
    setSelected(null);
    setFeedback(null);
  }

  function pct(domId) { const s = stats[domId] || { correct: 0, total: 0 }; return s.total > 0 ? Math.round((s.correct / s.total) * 100) : null; }
  function totalAnswered() { return Object.values(stats).reduce((s, d) => s + d.total, 0); }
  function overallPct() { const tot = Object.values(stats).reduce((s, d) => s + d.total, 0); const cor = Object.values(stats).reduce((s, d) => s + d.correct, 0); return tot > 0 ? Math.round((cor / tot) * 100) : null; }

  const weakest = getWeakestDomain(stats);
  const weakestDomain = weakest ? DOMAINS.find(d => d.id === weakest) : null;
  const dailyPct = Math.min(Math.round((dailyDone / DAILY_TARGET) * 100), 100);
  const op = overallPct();
  const totalQs = sessionQueue.length;
  const progressPct = totalQs > 0 ? (sessionIdx / totalQs) * 100 : 0;

  const NavBar = () => (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#0d1526", borderTop: `1px solid ${border}`, display: "flex", zIndex: 100 }}>
      <button onClick={() => setTab("dashboard")} style={{ flex: 1, padding: "12px 4px 14px", background: "transparent", border: "none", color: tab === "dashboard" ? "#6366f1" : "#475569", fontSize: 10, fontWeight: 600, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
        <span style={{ fontSize: 16 }}>⊞</span>Dashboard
      </button>
      <button onClick={() => setTab("review")} style={{ flex: 1, padding: "12px 4px 14px", background: "transparent", border: "none", color: tab === "review" || (tab === "quiz" && mode === "review") ? "#f87171" : "#475569", fontSize: 10, fontWeight: 600, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
        <span style={{ fontSize: 16 }}>✗</span>Review{failedQs.length > 0 ? ` (${failedQs.length})` : ""}
      </button>
      <button onClick={startExam} style={{ flex: 1, padding: "12px 4px 14px", background: "transparent", border: "none", color: tab === "quiz" && mode === "exam" ? "#38bdf8" : "#475569", fontSize: 10, fontWeight: 600, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
        <span style={{ fontSize: 16 }}>📋</span>Exam
      </button>
      <button onClick={startPractice} style={{ flex: 1, padding: "12px 4px 14px", background: "transparent", border: "none", color: tab === "quiz" && mode === "practice" ? "#34d399" : "#475569", fontSize: 10, fontWeight: 600, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
        <span style={{ fontSize: 16 }}>▶</span>Practice
      </button>
    </div>
  );

  if (tab === "dashboard") return (
    <div style={{ background: bg, minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", padding: "24px 16px 100px", color: "#e2e8f0" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ marginBottom: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{ background: "linear-gradient(135deg,#6366f1,#38bdf8)", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.08em" }}>SY0-701</div>
            <span style={{ color: "#475569", fontSize: 12 }}>CompTIA Security+ · {ALL_QUESTIONS.length} questions</span>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", margin: 0 }}>Study Dashboard</h1>
          <p style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>Day {getDayNumber()} of 23 · Exam: 18 July</p>
        </div>

        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "18px", marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8" }}>Today's Progress</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: dailyDone >= DAILY_TARGET ? "#34d399" : "#f1f5f9" }}>{dailyDone} / {DAILY_TARGET}</span>
          </div>
          <div style={{ background: "#1e293b", borderRadius: 99, height: 8, overflow: "hidden" }}>
            <div style={{ background: dailyPct >= 100 ? "#34d399" : "linear-gradient(90deg,#6366f1,#38bdf8)", height: "100%", width: `${dailyPct}%`, borderRadius: 99, transition: "width 0.5s ease" }} />
          </div>
          <p style={{ color: "#475569", fontSize: 12, marginTop: 6 }}>{dailyDone >= DAILY_TARGET ? "🎯 Daily target reached!" : `${DAILY_TARGET - dailyDone} more to hit today's target`}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "14px" }}>
            <p style={{ color: "#64748b", fontSize: 11, margin: "0 0 4px" }}>Accuracy</p>
            <p style={{ fontSize: 26, fontWeight: 800, margin: 0, color: op === null ? "#334155" : op >= 75 ? "#34d399" : op >= 60 ? "#fbbf24" : "#f87171" }}>{op !== null ? `${op}%` : "—"}</p>
            <p style={{ color: "#475569", fontSize: 11, marginTop: 2 }}>{totalAnswered()} done</p>
          </div>
          <div style={{ background: card, border: `1px solid ${failedQs.length > 0 ? "#f8717144" : border}`, borderRadius: 12, padding: "14px" }}>
            <p style={{ color: "#64748b", fontSize: 11, margin: "0 0 4px" }}>Failed</p>
            <p style={{ fontSize: 26, fontWeight: 800, margin: 0, color: failedQs.length > 0 ? "#f87171" : "#334155" }}>{failedQs.length}</p>
            <p style={{ color: "#475569", fontSize: 11, marginTop: 2 }}>to retry</p>
          </div>
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "14px" }}>
            <p style={{ color: "#64748b", fontSize: 11, margin: "0 0 4px" }}>Bank</p>
            <p style={{ fontSize: 26, fontWeight: 800, margin: 0, color: "#38bdf8" }}>{ALL_QUESTIONS.length}</p>
            <p style={{ color: "#475569", fontSize: 11, marginTop: 2 }}>questions</p>
          </div>
        </div>

        {weakestDomain && (
          <div style={{ background: card, border: `1px solid ${weakestDomain.color}44`, borderRadius: 12, padding: "14px", marginBottom: 12 }}>
            <p style={{ color: "#64748b", fontSize: 11, margin: "0 0 3px" }}>⚠️ Weakest domain</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: weakestDomain.color, margin: 0 }}>{weakestDomain.label}</p>
            <p style={{ color: "#475569", fontSize: 11, margin: "2px 0 0" }}>{pct(weakestDomain.id)}% accuracy — focus here today</p>
          </div>
        )}

        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "18px", marginBottom: 12 }}>
          <p style={{ color: "#94a3b8", fontSize: 13, fontWeight: 600, margin: "0 0 14px" }}>Domain Breakdown</p>
          {DOMAINS.map(d => { const s = stats[d.id] || { correct: 0, total: 0 }; const p = pct(d.id); return (
            <div key={d.id} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: "#cbd5e1" }}>{d.label}</span>
                <span style={{ fontSize: 11, color: p !== null ? d.color : "#334155", fontWeight: 600 }}>{p !== null ? `${p}%` : "—"} <span style={{ color: "#475569", fontWeight: 400 }}>({s.correct}/{s.total})</span></span>
              </div>
              <div style={{ background: "#1e293b", borderRadius: 99, height: 5, overflow: "hidden" }}>
                <div style={{ background: d.color, height: "100%", width: p !== null ? `${p}%` : "0%", borderRadius: 99, opacity: 0.85, transition: "width 0.5s ease" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                <span style={{ fontSize: 10, color: "#334155" }}>{d.weight}% of exam · {ALL_QUESTIONS.filter(q=>q.domain===d.id).length} Qs</span>
                <span style={{ fontSize: 10, color: p !== null && p < 75 ? "#f87171" : "#334155" }}>target ≥75%</span>
              </div>
            </div>
          ); })}
        </div>

        {totalAnswered() > 0 && (
          <button onClick={() => { saveStats({}); saveDailyDone(0); saveAnsweredIds([]); saveFailedQs([]); }}
            style={{ width: "100%", background: "transparent", color: "#475569", border: `1px solid ${border}`, borderRadius: 12, padding: "12px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Reset all progress
          </button>
        )}
      </div>
      <NavBar />
    </div>
  );

  if (tab === "review") return (
    <div style={{ background: bg, minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", padding: "24px 16px 100px", color: "#e2e8f0" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", marginBottom: 4 }}>Failed Questions</h2>
        <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>{failedQs.length} to review · Correct answers remove questions from this list</p>
        {failedQs.length === 0 ? (
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "40px", textAlign: "center" }}>
            <p style={{ fontSize: 32, marginBottom: 8 }}>🎯</p>
            <p style={{ color: "#34d399", fontWeight: 700, marginBottom: 4 }}>No failed questions!</p>
          </div>
        ) : (
          <>
            <button onClick={startReview} style={{ width: "100%", background: "linear-gradient(135deg,#f87171,#f472b6)", color: "#fff", border: "none", borderRadius: 12, padding: "15px", fontSize: 14, fontWeight: 700, cursor: "pointer", marginBottom: 16 }}>
              Retry All {failedQs.length} Failed Questions →
            </button>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {failedQs.map(q => { const d = DOMAINS.find(d => d.id === q.domain); return (
                <div key={q.id} style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "14px 16px" }}>
                  <div style={{ display: "inline-block", background: d.color + "22", border: `1px solid ${d.color}44`, borderRadius: 4, padding: "2px 8px", fontSize: 10, fontWeight: 600, color: d.color, marginBottom: 8 }}>{d.label}</div>
                  <p style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 }}>{q.q}</p>
                  <p style={{ color: "#475569", fontSize: 12, marginTop: 6 }}>Correct: <span style={{ color: "#34d399", fontWeight: 600 }}>{q.ans}</span></p>
                </div>
              ); })}
            </div>
          </>
        )}
      </div>
      <NavBar />
    </div>
  );

  if (tab === "quiz") {
    const domainObj = question ? DOMAINS.find(d => d.id === question.domain) : null;
    const isExam = mode === "exam";
    const accentColor = isExam ? "#38bdf8" : mode === "review" ? "#f87171" : (domainObj?.color || "#6366f1");
    return (
      <div style={{ background: bg, minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", padding: "20px 16px 100px", color: "#e2e8f0" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <button onClick={() => setTab("dashboard")} style={{ background: "transparent", border: `1px solid ${border}`, color: "#64748b", borderRadius: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer" }}>← Exit</button>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {isExam && <span style={{ background: "#38bdf822", border: "1px solid #38bdf8", borderRadius: 6, padding: "2px 8px", fontSize: 11, color: "#38bdf8", fontWeight: 700 }}>EXAM MODE</span>}
              {mode === "review" && <span style={{ background: "#f8717122", border: "1px solid #f87171", borderRadius: 6, padding: "2px 8px", fontSize: 11, color: "#f87171", fontWeight: 700 }}>REVIEW</span>}
              <span style={{ color: "#475569", fontSize: 13 }}>Q{sessionIdx + 1}/{totalQs}</span>
            </div>
          </div>

          <div style={{ background: "#1e293b", borderRadius: 99, height: 4, marginBottom: 18, overflow: "hidden" }}>
            <div style={{ background: accentColor, height: "100%", width: `${progressPct}%`, borderRadius: 99, transition: "width 0.4s ease" }} />
          </div>

          {question && <>
            {domainObj && <div style={{ display: "inline-block", background: domainObj.color + "22", border: `1px solid ${domainObj.color}44`, borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 600, color: domainObj.color, marginBottom: 14 }}>{domainObj.label}</div>}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: "20px 22px", marginBottom: 12 }}>
              <p style={{ color: "#e2e8f0", fontSize: 15, lineHeight: 1.7, fontWeight: 500, margin: 0 }}>{question.q}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 12 }}>
              {question.opts.map(opt => {
                const letter = opt[0];
                let bg2 = "#111827", borderC = "#1f2937", color = "#cbd5e1";
                if (selected) { if (letter === question.ans) { bg2 = "rgba(52,211,153,0.1)"; borderC = "#34d399"; color = "#34d399"; } else if (letter === selected) { bg2 = "rgba(248,113,113,0.1)"; borderC = "#f87171"; color = "#f87171"; } else { color = "#334155"; } }
                return <button key={letter} onClick={() => handleAnswer(letter)} style={{ width: "100%", textAlign: "left", padding: "13px 16px", borderRadius: 10, border: `1px solid ${borderC}`, background: bg2, color, fontSize: 14, fontWeight: 500, cursor: selected ? "default" : "pointer", transition: "all 0.15s ease" }}>{opt}</button>;
              })}
            </div>
            {feedback && !isExam && (
              <div style={{ background: feedback.correct ? "rgba(52,211,153,0.08)" : "rgba(248,113,113,0.08)", border: `1px solid ${feedback.correct ? "#34d399" : "#f87171"}`, borderRadius: 12, padding: "14px 18px", marginBottom: 12 }}>
                <p style={{ color: feedback.correct ? "#34d399" : "#f87171", fontWeight: 700, fontSize: 14, margin: "0 0 4px" }}>{feedback.correct ? "✓ Correct!" : `✗ Answer: ${feedback.correctLetter}`}</p>
                <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{feedback.explanation}</p>
              </div>
            )}
            {isExam && feedback && (
              <div style={{ background: "#1e293b", border: `1px solid ${border}`, borderRadius: 12, padding: "12px 16px", marginBottom: 12 }}>
                <p style={{ color: "#475569", fontSize: 13, margin: 0 }}>Answer recorded — results shown at the end</p>
              </div>
            )}
            {feedback && <button onClick={handleNext} style={{ width: "100%", background: accentColor, color: "#0a0f1e", border: "none", borderRadius: 10, padding: "14px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>{sessionIdx + 1 >= totalQs ? (isExam ? "See Exam Results →" : "See Results →") : "Next →"}</button>}
          </>}
        </div>
        <NavBar />
      </div>
    );
  }

  if (tab === "results") {
    const isExam = mode === "exam";
    const examScore = isExam ? examAnswers.filter(a => a.correct).length : null;
    const examTotal = isExam ? examAnswers.length : null;
    const examPct = isExam ? Math.round((examScore / examTotal) * 100) : null;
    const pass = examPct >= 75;

    const examDomainStats = isExam ? DOMAINS.map(d => {
      const dAnswers = examAnswers.filter(a => a.domain === d.id);
      const correct = dAnswers.filter(a => a.correct).length;
      return { ...d, correct, total: dAnswers.length, pct: dAnswers.length > 0 ? Math.round((correct / dAnswers.length) * 100) : 0 };
    }) : null;

    return (
      <div style={{ background: bg, minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", padding: "24px 16px 100px", color: "#e2e8f0" }}>
        <div style={{ maxWidth: 540, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>{isExam ? (pass ? "🏆" : "📚") : "🛡️"}</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", margin: "0 0 4px" }}>{isExam ? "Exam Complete" : mode === "review" ? "Review Complete" : "Session Complete"}</h2>
            {isExam && <div style={{ display: "inline-block", background: pass ? "rgba(52,211,153,0.15)" : "rgba(248,113,113,0.15)", border: `1px solid ${pass ? "#34d399" : "#f87171"}`, borderRadius: 8, padding: "4px 14px", fontSize: 13, fontWeight: 700, color: pass ? "#34d399" : "#f87171", marginTop: 8 }}>{pass ? "PASS" : "FAIL"} · 75% required</div>}
          </div>

          <div style={{ fontSize: 60, fontWeight: 800, color: isExam ? (pass ? "#34d399" : "#f87171") : (op >= 80 ? "#34d399" : op >= 60 ? "#fbbf24" : "#f87171"), textAlign: "center", marginBottom: 4 }}>
            {isExam ? `${examPct}%` : (op !== null ? `${op}%` : "—")}
          </div>
          {isExam && <p style={{ color: "#64748b", fontSize: 14, textAlign: "center", marginBottom: 24 }}>{examScore} / {examTotal} correct</p>}
          {!isExam && <p style={{ color: "#64748b", fontSize: 13, textAlign: "center", marginBottom: 24 }}>{dailyDone} today · {failedQs.length} failed</p>}

          {isExam && examDomainStats && (
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "18px", marginBottom: 20 }}>
              <p style={{ color: "#94a3b8", fontSize: 13, fontWeight: 600, margin: "0 0 14px" }}>Domain Results</p>
              {examDomainStats.map(d => (
                <div key={d.id} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: "#cbd5e1" }}>{d.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: d.pct >= 75 ? "#34d399" : "#f87171" }}>{d.pct}% ({d.correct}/{d.total})</span>
                  </div>
                  <div style={{ background: "#1e293b", borderRadius: 99, height: 5, overflow: "hidden" }}>
                    <div style={{ background: d.pct >= 75 ? "#34d399" : "#f87171", height: "100%", width: `${d.pct}%`, borderRadius: 99 }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button onClick={startPractice} style={{ width: "100%", background: "linear-gradient(135deg,#6366f1,#38bdf8)", color: "#fff", border: "none", borderRadius: 10, padding: "14px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Practice 10 More →</button>
            <button onClick={startExam} style={{ width: "100%", background: "rgba(56,189,248,0.15)", color: "#38bdf8", border: "1px solid #38bdf8", borderRadius: 10, padding: "13px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Take Another Exam →</button>
            {failedQs.length > 0 && <button onClick={startReview} style={{ width: "100%", background: "rgba(248,113,113,0.12)", color: "#f87171", border: "1px solid #f87171", borderRadius: 10, padding: "13px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Retry {failedQs.length} Failed →</button>}
            <button onClick={() => setTab("dashboard")} style={{ width: "100%", background: "#1e293b", color: "#cbd5e1", border: `1px solid ${border}`, borderRadius: 10, padding: "13px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Dashboard</button>
          </div>
        </div>
        <NavBar />
      </div>
    );
  }
}
