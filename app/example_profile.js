const Profile = require('./profile');

const studentProfile = new Profile('chalkers');

studentProfile.on('end', console.dir);
studentProfile.on('error', console.error);