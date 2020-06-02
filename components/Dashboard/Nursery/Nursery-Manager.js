import {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import styles from './Nursery-Dashboard.module.scss';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';

const Nursery = props => {
  const [nurseryData, setNurseryData] = useState();
  const [maximumSpace, setMaximumSpace] = useState();
  const [temperatureLevel, setTemepratureLevel] = useState(0);
  const [seedlings, setSeedlings] = useState([]);
  const [waterLevel, setWaterLevel] = useState(0);
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

  const confirmChanges = async () => {
    if (temperatureLevel) {
      await axios.post('https://gardenhouse.tech/nursery/temeprature', {
        id: props.id,
        temeprature: temperatureLevel,
      });
    }

    if (waterLevel) {
      await axios.post('https://gardenhouse.tech/nursery/water', {
        id: props.id,
        water: waterLevel,
      });
    }
    getNurseryData();
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  const getTokenInfo = async () => {
    const cookie = Cookies.get('JWT');
    jwt.verify(cookie, 'secertToken', async (err, decoded) => {
      setToken(decoded);
    });
  };

  const getSeedlings = () => {
    axios
      .post('https://gardenhouse.tech/seedling/nursery/', {
        id: props.id,
      })
      .then(data => {
        setSeedlings(data.data.data);
      });
  };

  const getMaximumSpace = () => {
    if (nurseryData) {
      setMaximumSpace(nurseryData.length * 1 * nurseryData.width * 1);
      setTemepratureLevel(nurseryData.temeprature);
      setWaterLevel(nurseryData.waterlevel);
    }
  };

  const getNurseryData = () => {
    axios
      .post('https://gardenhouse.tech/nursery/id', {
        id: props.id,
      })
      .then(data => {
        setNurseryData(data.data.data.rows[0]);
      });
  };

  useEffect(() => {
    if (!token) getTokenInfo();
    if (!nurseryData) getNurseryData();
    getMaximumSpace();
    getSeedlings();
  }, [token, nurseryData]);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.managerContainer}>
          {nurseryData ? <p>{nurseryData.name}</p> : null}
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
                  <p>Temeprature</p>
                  <div>
                    <WbSunnyIcon className={styles.sun} />
                    <p>{nurseryData.temeprature}°C</p>
                  </div>
                  <Slider
                    getAriaValueText={valuetext}
                    value={temperatureLevel}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    valueLabelDisplay="auto"
                    max={25}
                    marks={temepratureMarks}
                    className={styles.sliderSun}
                    onChange={(e, newValue) => setTemepratureLevel(newValue)}
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
                    onChange={(e, newValue) => setWaterLevel(newValue)}
                  />
                </div>
              </div>
              <Button onClick={confirmChanges} className={styles.confirmButton}>
                Confirm changes
              </Button>
            </div>
          ) : null}
        </div>
        <div className={styles.seedlingsContainer}>
          <button onClick={() => console.log(seedlings)}>Click me</button>
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
            Nursery successfuly created!
          </Alert>
        ) : null}
      </div>
    </div>
  );
};

export default Nursery;
