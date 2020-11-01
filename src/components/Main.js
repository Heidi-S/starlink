import React, {Component} from 'react';
import SatSetting from './SatSetting'
import SatelliteList from './SatelliteList'
import axios from 'axios';
import {NEARBY_SATELLITE, SAT_API_KEY, STARLINK_CATEGORY} from '../constants'

class Main extends Component {
    constructor(){
        super();
        this.state = {
            satInfo: null,
            settings: null,
            isLoadingList: false
        };
    }

    showNearbySatellite = (setting) => {
        this.setState({
            settings: setting
        })
        this.fetchSatellite(setting);
    }

    fetchSatellite = (setting) => {
        const {latitude, longitude, elevation, altitude} = setting;
        const url = `/api/${NEARBY_SATELLITE}/${latitude}/${longitude}/${elevation}/${altitude}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;

        this.setState({
            isLoadingList: true
        });

        axios.get(url)
            .then(response => {
                console.log(response)
                this.setState({
                    satInfo: response.data,
                    isLoadingList: false
                })
            })
            .catch(error => {
                console.log('err in fetch satellite ->', error)
            })

    }


    render() {
        return (
            <div className='main'>
                <div className="left-side">
                    <SatSetting onShow = {this.showNearbySatellite} />
                    <SatelliteList />
                </div>
                <div className="right-side">
                    right
                </div>
            </div>
        );
    }
}
export default Main;
