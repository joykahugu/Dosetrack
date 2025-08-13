 

function dropdownMenu() {
    document.getElementById('navbar-sticky').classList.toggle('hidden');
}

const donutChart = document.getElementById('donutChart').getContext('2d');
let trackerChart = new Chart(donutChart, {
  type: 'doughnut',
  data: {
    labels: ['Days Passed', 'Days left'],
    datasets: [
      {
        label: 'Days Progress',
        data: [0,0],
        backgroundColor: ['#2d3987', '#9bb7fb'],
        radius: ['70%'],
       
      }]
  },
   options: {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label}: ${context.raw} days`
                }
            }
        }
    }
});

function setChart() {
  const fromDate = document.getElementById('startDate').value;
  const lastDate = document.getElementById('lastDate').value;
  if (!fromDate || !lastDate) return;

  const startDate = new Date(fromDate);
  const endDate = new Date(lastDate);
  const today = new Date();

  const totalDays = Math.ceil((endDate-startDate) / (1000*60*60*24));
  const passedDays = Math.max(0, Math.min(totalDays, Math.ceil((today-startDate)/(1000*60*60*24))));
  const remainingDays = Math.max(0, totalDays-passedDays);

  trackerChart.data.datasets[0].data = [passedDays, remainingDays];
  trackerChart.update();
};

document.getElementById('startDate').addEventListener('change', setChart);
document.getElementById('lastDate').addEventListener('change', setChart);