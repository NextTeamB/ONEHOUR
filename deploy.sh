REPOSITORY=/home/ubuntu/deploy

cd $REPOSITORY

sudo npm install

pm2 kill

sudo npm run deploy