FROM node:16.7

#Set the working directory
WORKDIR /usr/src/app

#copy all the files
COPY . .

#Install the dependencies
RUN npm install

# #Expose the required port
EXPOSE 3000

# #Run the command
CMD ["npm", "start"]