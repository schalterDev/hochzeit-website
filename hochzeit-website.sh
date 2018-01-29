#!/bin/bash

echo "Dieses Script muss im Ordner 'hochzeit-website' liegen"

echo "Willst du node, npm und git installieren (muss man nur einmal)? (J / n)"
read node_npm

if [ $node_npm == "J" ];
then

# node
sudo apt update
sudo apt install -y curl
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential

# npm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

#git
sudo apt install -y git

fi

echo "Willst du die neuste Version der Website herunterladen?"
echo "ACHTUNG: Alle nicht auf GitHub gespeicherten Daten gehen verloren (J / n)"
read github

if [ $github == "J" ];
then

cd ..
sudo rm -R hochzeit-website
git clone https://github.com/schalterDev/hochzeit-website.git
cd hochzeit-website

fi

npm install

echo "Starting server"
npm run dev & server/node index.js
