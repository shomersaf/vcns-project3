  
import { useEditVacationsQuery } from "../store/api/vacations.api"
import { Chart } from 'primereact/chart';

import CsvDownloadButton from 'react-json-to-csv';
import { Header } from "../ui/header";
import { Footer } from "../ui/footer";

export function Statistics() {
  const { isError, isLoading, data } = useEditVacationsQuery("")
  const destinations = data?.map(vacation => (vacation.destination))
  const followers = data?.map(vacation => (vacation.followers))
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
//  const colors = ['#2980B9','#3498DB','#48C9B0','#45B39D','#58D68D'];
  const chartData = {
    labels: destinations,

    datasets: [
      {
        label: "Followers per Vacation",
        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
        borderColor: documentStyle.getPropertyValue('--blue-500'),
        data: followers
      },

    ]
  };

  const chartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          fontColor: textColor
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
          font: {
            weight: 500
          }
        },
        grid: {
          display: false,
          drawBorder: false
        }
      },
      y: {
        ticks: {
          color: textColorSecondary,
          stepSize: 1
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false
        }
      }
    }
  };
  
  return (
 <>
 <Header />
     <div className="graph">
      {isError && <p className="errorP">Something went wrong...</p>}
      {isLoading && <p className="loadingP">Loading...</p>|| <div>
    
      <Chart type="bar" data={chartData} options={chartOptions} />
      </div>
      }
      {/* <div className="brif">
        <h3>Followers per Vacation:</h3>
      {data?.map(vacation => (
        <p key={vacation.vcnId}>{vacation.destination} - {vacation.followers}</p> 
        ))}

      </div> */}
      { data &&<CsvDownloadButton data={data} filename="my_vacations.csv" >Download CSV File</CsvDownloadButton>}
    </div>
    <Footer />
 </>
  )
}