---
layout: default
---

AI-Z is a tool to display hardware resource usage and info. Supports both NVIDIA and AMD GPUs


![screenhsot](./assets/screenshot01.png)

### Install and usage
```
git clone https://github.com/ai-z/ai-z.git
cd ai-z
pip3 install -r requirements.txt
python3 ai-z.py
```
### Issues
Please post issues and feature requests at: [Github issues page](https://github.com/ai-z/ai-z/issues) <br>
Known issues:
*   AMD GPUs name will be displayed as 'cardX'
*   PCIE bandwith usage graph on NVDIA cards is not correct

