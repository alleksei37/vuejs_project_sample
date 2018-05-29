Command to start development server from terminal:
cd /webapp/src/main/webapp/ui-components
NODE_ENV=development npm run start

or run
mvn package -Pmin-prod -Dmaven.test.skip -Dwebpack=dev
