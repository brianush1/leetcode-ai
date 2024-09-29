npm run build
ssh lootcode10 "rm -rf build package.json package-lock.json"
scp -r build lootcode10:
scp package.json lootcode10:
scp package-lock.json lootcode10:
ssh lootcode10 'bash -c "(
	source $HOME/.nvm/nvm.sh
	npm i
)"'
