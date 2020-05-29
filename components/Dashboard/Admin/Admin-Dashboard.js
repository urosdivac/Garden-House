import {useState, useEffect} from 'react';
import styles from './Admin.module.scss';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import WelcomeHeader from './WelcomeHeader';
import RequestsTable from './RequestsTable';
import DataField from './DataField';
import axios from 'axios';

const Admin = () => {
  const [token, setToken] = useState();
  const [data, setData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [filteredData, setFilteredData] = useState([]);

  const newRequests = () => {
    const arr = data.filter(item => item.isaccepted === 'pending');
    return arr.length;
  };

  const changeStatusFilter = filter => {
    setStatusFilter(filter);

    if (filter === 'all') {
      setFilteredData(data);
      return;
    }

    setFilteredData([]);

    data.forEach(item => {
      if (item.isaccepted == filter)
        setFilteredData(prevState => [...prevState, item]);
    });
  };

  const getTokenInfo = async () => {
    const cookie = Cookies.get('JWT');
    jwt.verify(cookie, 'secertToken', async (err, decoded) => {
      setToken(decoded);
    });
  };

  const getData = async () => {
    const data = await axios.get('https://gardenhouse.tech/admin/');
    setData([...data.data.data]);
    setFilteredData([...data.data.data]);
  };

  useEffect(() => {
    getData();
    getTokenInfo();
  }, []);
  return (
    <div className={styles.container}>
      <WelcomeHeader
        name={token ? token.firstname : null}
        requestsNumber={newRequests()}
      />
      <RequestsTable
        changeStatusFilter={changeStatusFilter}
        statusfilter={statusFilter}
      />
      <div className={styles.dataWrapper}>
        {filteredData
          ? filteredData.map(item => {
              return (
                <DataField
                  key={item.id}
                  id={item.id}
                  firstname={item.firstname}
                  lastname={item.lastname}
                  username={item.username}
                  createdat={new Date(item.created_at).toLocaleDateString()}
                  birthday={new Date(item.birthday).toLocaleDateString()}
                  phonenumber={item.phonenumber}
                  email={item.email}
                  isaccepted={item.isaccepted}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Admin;