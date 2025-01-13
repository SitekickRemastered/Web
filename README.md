# Sitekick Remastered Website (MkDocs)

Welcome to the repository for [Sitekick Remastered](https://sitekickremastered.com/)'s homepage, blog, and wiki! 

## Software Needed
1. Git
1. [Python 3.12 or later](https://www.python.org/)
1. [VSCode](https://code.visualstudio.com/) (Recommended)

## Setting up your environment
1. Clone ```https://github.com/SitekickRemastered/Docs.git``` and navigate into the folder.

2. Create and activate a virtual environment:
```
python3 -m venv venv
```
- To activate the venv:
    - On Windows: `. venv/Scripts/activate`
    - On Mac and Linux: `. venv/bin/activate`

3. Install dependencies by opening cmd and running: ```pip install -r ./requirements.txt```



## Running the Local Server
1. In commandline: ```cd C:\Path\You\Cloned\Repo\To\```
1. ```mkdocs serve```
1. Open http://localhost:8014/ in your browser

When the server is running, any changes you save will be refreshed on the local server in real time.  Upon committing changes, if your changes are accepted, Github Pages will update the homepage directly >> https://sitekickremastered.com/

Note: Changes to the landing page require refreshing another file or re-running *mkdocs serve*.

Note 2: To exit the virtual environment, enter `deactivate` into your terminal.