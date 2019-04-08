# HomeQueue

Playing music using the spotify API

## Setup
### Requires nvm
To install nvm:
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```

### Requires node v11.1.0
To install node using nvm:
```bash
nvm install v11.1.0
```

### Required global packages
* `babel-cli@6.26.0`
* `expo-cli@2.3.8`
* `react-native-git-upgrade@0.2.7`

installed using:
```
sudo npm install -g <package@version>
```

### Installing dependencies
Go to cloned directory and run
```bash
npm install
```

All required dependencies should now be ready.

## Usage
To start the app:
```bash
npm start
```

or use the docker image `ajnagashima/homequeue:part2`
This docker image doesn't have node_modules installed locally and needs to be linked to the directory `~/.../HomeQueue/` to run

## Troubleshooting

Please open an issue if you have any trouble starting the app

