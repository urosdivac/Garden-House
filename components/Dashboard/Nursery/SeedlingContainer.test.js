const calculateProgress = date => {
  const totalHours = 480;

  const hoursPassed = Math.floor((new Date(date) - new Date()) / 1000 / 3600);

  const hoursLeft = totalHours - hoursPassed;

  const percentageDone = Math.floor((hoursLeft / totalHours) * 100);

  if (percentageDone < 0) return 100;

  return percentageDone;
};

test('Format days till harvest to percentage', () => {
  expect(calculateProgress('2020-06-23T22:59:08+02:00')).toEqual(39);
});
