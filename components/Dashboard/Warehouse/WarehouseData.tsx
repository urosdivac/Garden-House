import {useEffect, useState} from 'react';
import axios from 'axios';
import Filters from './Filters';
import Fields from './Fields';
import Data from './Data';
import getToken from '../../../src/getToken';
const styles = require('./WarehouseData.module.scss');

interface Token {
  id: number;
}

const WarehouseData = () => {
  const [seedlings, setSeedlings] = useState([]);
  const [fertilizers, setFertilizers] = useState([]);
  const [token, setToken] = useState<Token | undefined>();
  const [warehouseId, setWarehouseId] = useState();
  const [filter, setFilter] = useState('all');

  const handleSetFilter = (filter: string) => {
    setFilter(filter);
  };

  const getWarehouse = async () => {
    const data = await axios.post('https://gardenhouse.tech/warehouse/find', {
      id: token.id,
    });

    setWarehouseId(data.data.data[0].id);
  };

  const getData = async () => {
    const data = await axios.post('https://gardenhouse.tech/warehouse/', {
      id: warehouseId,
      sort: 'name',
      order: 'desc',
      seedlings: true,
      fertilizers: true,
    });

    setSeedlings(data.data.data.seedlings);
    setFertilizers(data.data.data.fertilizers);
  };

  useEffect(() => {
    if (!token) setToken(getToken());
    if (token && !warehouseId) getWarehouse();
    if (warehouseId) getData();
  }, [token, warehouseId]);

  return (
    <div className={styles.container}>
      <Filters setfilter={handleSetFilter} filter={filter} />
      <div className={styles.warehouseDataContainer}>
        <Fields />

        {filter === 'all' || (filter === 'seedling' && seedlings.length > 0)
          ? seedlings.map((seedling, index) => {
              return (
                <Data
                  name={seedling.name}
                  type="Seedling"
                  quantity={seedling.count}
                  key={index}
                />
              );
            })
          : null}

        {filter === 'all' || (filter === 'fertilizer' && fertilizers.length > 0)
          ? fertilizers.map((fertilizer, index) => {
              return (
                <Data
                  name={fertilizer.name}
                  type="Fertilizer"
                  quantity={fertilizer.count}
                  speeduptime={fertilizer.speedup_time}
                  key={index}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default WarehouseData;
