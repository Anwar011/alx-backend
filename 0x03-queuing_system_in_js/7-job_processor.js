import { createQueue } from 'kue';

const queue = createQueue();

const blackList = ['4153518780', '4153518781'];

const sendNotification = (phoneNumber, message, job, done) => {
  job.progress(0, 100);
  if (phoneNumber in blackList) {
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }
  job.progress(50, 100);
  console.log(
    `Sending notification to ${phoneNumber}, with message: ${message}`
  );
  done();
};

queue.process('push_notification_code_2', function (job, done) {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
