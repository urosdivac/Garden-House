import {useEffect, useState} from 'react';
import Link from 'next/link';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Slider from '@material-ui/core/Slider';
import Seedling from './SeedlingContainer';
import getToken from '../../../src/getToken';
import Dialog from './Dialog';
const styles = require('./Nursery-Dashboard.module.scss');

interface Props {
  id: number;
}

interface NurseryData {
  width: number;
  length: number;
  waterlevel: number;
  temeprature: number;
  name: string;
  available_space: number;
}

const Nursery = ({id}: Props) => {
  const [nurseryData, setNurseryData] = useState<NurseryData | undefined>();
  const [maximumSpace, setMaximumSpace] = useState(0);
  const [temperature, setTemeprature] = useState<number | number[]>(0);
  const [waterLevel, setWaterLevel] = useState<number | number[]>(0);
  const [seedlings, setSeedlings] = useState([]);
  const [token, setToken] = useState();
  const [nurserySucces, setNurserySuccess] = useState(false);

  const temepratureMarks = [
    {
      value: 0,
      label: '0°C',
    },
    {
      value: 5,
      label: '5°C',
    },
    {
      value: 10,
      label: '10°C',
    },

    {
      value: 15,
      label: '15°C',
    },
    {
      value: 20,
      label: '20°C',
    },

    {
      value: 25,
      label: '25°C',
    },
  ];

  const waterMarks = [
    {
      value: 0,
      label: '0 L',
    },
    {
      value: 50,
      label: '50 L',
    },
    {
      value: 100,
      label: '100 L',
    },

    {
      value: 150,
      label: '150 L',
    },
    {
      value: 200,
      label: '200 L',
    },
  ];

  const handleTemeprature = async () => {
    if (temperature) {
      await axios.post('https://gardenhouse.tech/nursery/temeprature', {
        id: id,
        temeprature: temperature,
      });
      getNurseryData();
    }
  };

  const handleWater = async () => {
    if (waterLevel) {
      await axios.post('https://gardenhouse.tech/nursery/water', {
        id: id,
        water: waterLevel,
      });
    }
    getNurseryData();
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  const showAlert = () => {
    setNurserySuccess(true);
  };

  const getSeedlings = () => {
    axios
      .post('https://gardenhouse.tech/seedling/nursery/', {
        id: id,
      })
      .then(data => {
        setSeedlings(data.data.data);
      });
  };

  const getMaximumSpace = () => {
    if (nurseryData) {
      setMaximumSpace(nurseryData.length * 1 * nurseryData.width * 1);
      setTemeprature(nurseryData.temeprature);
      setWaterLevel(nurseryData.waterlevel);
    }
  };

  const getNurseryData = () => {
    axios
      .post('https://gardenhouse.tech/nursery/id', {
        id: id,
      })
      .then(data => {
        setNurseryData(data.data.data.rows[0]);
      });
  };

  useEffect(() => {
    if (!token) setToken(getToken());
    if (!nurseryData) getNurseryData();
    getMaximumSpace();
    getSeedlings();
  }, [token, nurseryData]);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.managerContainer}>
          {nurseryData ? (
            <Link href="/nursery">
              <p>
                <ArrowBackIcon className={styles.backIcon} color="primary" />
                {nurseryData.name}
              </p>
            </Link>
          ) : null}
        </div>
        <div className={styles.statsManagerContainer}>
          {nurseryData ? (
            <div className={styles.outerStatsManagerContainer}>
              <div className={styles.innerStatsManagerContainer}>
                <div className={styles.availableSpaceContainer}>
                  <p>Available Space</p>
                  <div>
                    <AllInboxIcon className={styles.space} />
                    <p>
                      {nurseryData.available_space} / {maximumSpace}
                    </p>
                  </div>
                </div>
                <div className={styles.availableSpaceContainer}>
                  <p>Temprature</p>
                  <div>
                    <WbSunnyIcon className={styles.sun} />
                    <p>{nurseryData.temeprature}°C</p>
                  </div>
                  <Slider
                    getAriaValueText={valuetext}
                    value={temperature}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    valueLabelDisplay="auto"
                    max={25}
                    marks={temepratureMarks}
                    className={styles.sliderSun}
                    onChange={(e, newValue) => {
                      setTemeprature(newValue);
                    }}
                    onChangeCommitted={() => handleTemeprature()}
                  />
                </div>
                <div className={styles.availableSpaceContainer}>
                  <p>Water Levels</p>
                  <div>
                    <InvertColorsIcon className={styles.water} />
                    <p>{nurseryData.waterlevel} Liters</p>
                  </div>
                  <Slider
                    getAriaValueText={valuetext}
                    step={10}
                    valueLabelDisplay="auto"
                    max={200}
                    value={waterLevel}
                    marks={waterMarks}
                    className={styles.sliderWater}
                    onChange={(e, newValue) => {
                      setWaterLevel(newValue);
                    }}
                    onChangeCommitted={() => handleWater()}
                  />
                </div>

                <div className={styles.availableSpaceContainer}>
                  <p>Plant a seedling</p>
                  <Dialog
                    token={token}
                    nursery={id}
                    getnurserydata={getNurseryData}
                    getseedlings={getSeedlings}
                    showalert={showAlert}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className={styles.seedlingsContainer}>
          {seedlings.map(seedling => {
            return (
              <Seedling
                harvestdate={seedling.harvest_date}
                key={seedling.id}
                id={seedling.id}
              />
            );
          })}
        </div>
      </div>

      <div className={styles.alertContainer}>
        {nurserySucces ? (
          <Alert
            onClose={() => {
              setNurserySuccess(false);
            }}
            className={styles.alert}
          >
            Seedling successfully planted!
          </Alert>
        ) : null}
      </div>
    </div>
  );
};

export default Nursery;
