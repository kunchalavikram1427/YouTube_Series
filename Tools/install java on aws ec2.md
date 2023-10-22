# Installing Java on AWS EC2 with Amazon Corretto for Amazon Linux 2 and Amazon Linux 2023

## What is Amazon Corretto?
Amazon Corretto is a no-cost, multiplatform, production-ready distribution of the Open Java Development Kit (OpenJDK). 
Corretto comes with long-term support that includes performance enhancements and security fixes. 
Corretto is certified as compatible with the Java SE standard and is used internally at Amazon for many production services. With Corretto, you can develop and run Java applications on operating systems such as Amazon Linux 2, Windows, and macOS.

## Installing Java 8
Enable the yum repository in Amazon Linux 2. This is not required on Amazon Linux 2022 and later.
```
sudo amazon-linux-extras enable corretto8
```
You can install Amazon Corretto 8 as either the runtime environment (JRE) or the full development environment (JDK). The development environment includes the runtime environment.

Install Amazon Corretto 8 as JRE.
```
sudo yum install java-1.8.0-amazon-corretto
```
Install Amazon Corretto 8 as JDK.
```
sudo yum install java-1.8.0-amazon-corretto-devel
```
The installation location is /usr/lib/jvm/java-1.8.0-amazon-corretto.<cpu_arch>.


## Installing Java 11
Amazon Corretto 11 has a 'headless' variant available. 
This variant omits runtime dependencies that are typically associated with GUI applications such as X11 and ALSA and is worth considering for server-oriented workloads. 
The 'headful' variant adds support for X11 and ALSA. 
There is also a 'devel' package which contains the JDK development tools, as well as a 'jmods' package that contains the Amazon Corretto 11 JMods used to create custom runtime images.

Install the headless Amazon Corretto 11
```
sudo yum install java-11-amazon-corretto-headless
```
Install the headful Amazon Corretto 11
```
sudo yum install java-11-amazon-corretto
```
Install the JDK for Amazon Corretto 11
```
sudo yum install java-11-amazon-corretto-devel
```
Install the JMods for Amazon Corretto 11
```
sudo yum install java-11-amazon-corretto-jmods
```
The installation location is /usr/lib/jvm/java-11-amazon-corretto.<cpu_arch>.

## Installing Java 17
Amazon Corretto 17 has a 'headless' variant available. 
This variant omits runtime dependencies that are typically associated with GUI applications such as X11 and ALSA and is worth considering for server-oriented workloads. 
The 'headful' variant adds support for X11 and ALSA. 
There is also a 'devel' package which contains the JDK development tools, as well as a 'jmods' package that contains the Amazon Corretto 17 JMods used to create custom runtime images.

Install the headless Amazon Corretto 17
```
sudo yum install java-17-amazon-corretto-headless
```
Install the headful Amazon Corretto 17
```
sudo yum install java-17-amazon-corretto
```
Install the JDK for Amazon Corretto 17
```
sudo yum install java-17-amazon-corretto-devel
```
Install the JMods for Amazon Corretto 17
```
sudo yum install java-17-amazon-corretto-jmods
```
The installation location is /usr/lib/jvm/java-17-amazon-corretto.<cpu_arch>.

## Verify your installation
In the terminal, run the following command to verify the installation.
```
java -version
```
Expected output(depends on current active java version):
```
openjdk version "1.8.0_232"
OpenJDK Runtime Environment Corretto-8.232.09.1 (build 1.8.0_232-b09)
OpenJDK 64-Bit Server VM Corretto-8.232.09.1 (build 25.232-b09, mixed mode)
```

## Change the default java or javac providers
The `alternatives` command in Linux is used to manage symbolic links for various commands, system components, or programs. It allows users to easily switch between different versions or implementations of a particular software package or utility.
```
sudo alternatives --config java
```
If using the JDK you should also run:
```
sudo alternatives --config javac
```
