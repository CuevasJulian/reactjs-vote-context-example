import React, { useEffect,useState } from 'react';
import { Row,Col,Button } from 'antd';
import { RulingContext } from '@store';
import { ImageRouter, DateFormatter } from '@utils';
import './style.scss';

const TopicCard = ({ data, type, rawData }) => {
    const rulingsContext = React.useContext(RulingContext);
    const { rulingItems } = rulingsContext;
    const { thumbs_up, thumbs_down } = ImageRouter;
    const [ vote , setVote ] = useState(null);
    const [ percentVotes, setPercentVotes ] = useState({
        positive:0,
        negative:0,
    });



    useEffect( () => {
        calcPercents();
    },[data.data,rulingItems]);

    const calcPercents = () => {
        let positive = data.votes.positive;
        let negative = data.votes.negative;

        /**
         * Here I just trying simulate a little count 
         * what backend will do calculating percents
         */
        if(data.me && data.me == 'positive') positive += 1;
        if(data.me && data.me == 'negative') negative += 1;

        let total = parseInt(positive) + parseInt(negative);

        let percentPositive = parseFloat((100 * positive) / total).toFixed(1);
        let percentNegative = parseFloat((100 * negative) / total).toFixed(1);
        setPercentVotes({positive:percentPositive,negative:percentNegative});
    }

    const checkVote = ( ) => {
        const { data: items, setData } = rawData;
        let item = null;
        for(let i = 0 ; i < items.data.length ; i++){
            if(items.data[i].name === data.name){
                item = items.data[i];
                break;
            }
        }
        item.me = vote;
        item.lastUpdated = new Date();
        /**
         * Here we can insert api request to 
         * sync with backend services, then it 
         * front end will proceed to refresh data in setData() 
         */
        setData({data:items.data});
    }

    const resetVote = () => {
        const { data: items, setData } = rawData;
        let item = null;
        for(let i = 0 ; i < items.data.length ; i++){
            if(items.data[i].name === data.name){
                item = items.data[i];
                break;
            }
        }
        item.me = null;
        item.lastUpdated = new Date();
        /**
         * Local reset vote, with backend here
         * we can insert api query to set to - null - 
         * and proceed without it
         */
        setData({data:items.data});
    }

    return(
        <Col  xs={24} sm={12} lg={ type === 'list' ? 24 : 12 } xl={ type === 'list' ? 24 : 8 } className={['ruling-container', (type === 'grid' && 'ruling-container-grid') ]}>
            <div className={'card-container'}>

                <div className={'myvote-container'}>
                    { 
                        data.me ? 
                            data.me === 'positive' ? <img src={thumbs_up} style={{background:'#3cbbb4'}} className={'btn-vote'}/> : 
                            <img src={thumbs_down} style={{background:'#f9ad1d'}} className={'btn-vote'}/> :
                        ''
                    }

                </div>

                <div className={'image-container'}>
                    {
                        type === 'list' && (
                            <div className={'image-disolve'}></div>
                        ) 
                    }
                    <img className={'image-topic'} src={data.picture} />
                </div>

                <Row className={'info-container'}>
                    <Col lg={ type === 'list' ? 17 : 24} className={'info-col'}>
                        <div className={'info-text'}>
                            <h2>{data.name}</h2>
                            <p>{data.description}</p>
                        </div>
                    </Col>
                    <Col lg={ type === 'list' ? 7 : 24} className={'vote-container'}>
                        <p className={'vote-time'}>{ data.me && DateFormatter(data.lastUpdated) || ''}</p>
                        <div className={'actions'} >
                            { !data.me && <img onClick={() => setVote('positive')} src={thumbs_up} style={{background:'#3cbbb4'}} className={`btn-vote ${vote == 'positive' ? 'active' : ''}`}/> }
                            { !data.me && <img onClick={() => setVote('negative')} src={thumbs_down} style={{background:'#f9ad1d'}} className={`btn-vote ${vote == 'negative' ? 'active' : ''}`}/> }
                            
                            <Button onClick={data.me ? resetVote : checkVote}>{ data.me ? 'Vote Again' : 'Vote Now' }</Button>
                        </div>
                    </Col>
                </Row>

                <Row className={'statistic-container'}>
                    <Col span={24} className={'thumbs-container'} style={{background:`linear-gradient(to right,#3cbbb5d7  ${percentVotes.positive}%, #f9ac1ddc  ${percentVotes.positive}% )`}}>
                        <div className={'thumb'}>
                            <img src={thumbs_up}/>
                            <p className={'percent'}>{percentVotes.positive}%</p>
                        </div>
                        <div className={'thumb'}>
                            <p className={'percent'}>{percentVotes.negative}%</p>
                            <img src={thumbs_down}/>
                        </div>
                    </Col>
                </Row>
            </div>
        </Col>
    )
}

export default TopicCard;