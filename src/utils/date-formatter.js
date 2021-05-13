const front_date_formater = ( dateIn ) => {
    const date = new Date( dateIn )
    const now = new Date();

    const month = 31*24*60*60*1000;
    const day = 24*60*60*1000;
    const hour = 60*60*1000;
    const min = 60*1000;
    const sec = 1000;

    const diffMonth = Math.round(Math.abs((date - now)/month));
    const diffDay = Math.round(Math.abs((date - now)/day));
    const diffHour = Math.round(Math.abs((date - now)/hour));
    const diffMin = Math.round(Math.abs((date - now)/min));
    const diffSec = Math.round(Math.abs((date - now)/sec));

    // console.log(diffDay,diffHour,diffMin,diffSec);

    let text = '';

    if(diffDay > 0){
        text = `${diffMonth} Months ago`;
    }else if(diffDay > 0){
        text = `${diffDay} Days ago`;
    }else if(diffHour > 0){
        text = `${diffHour} Hours ago`;
    }else if(diffMin > 0){
        text = `${diffMin} Minutes ago`;
    }else if(diffSec > 0){
        text = `${diffSec} Seconds ago`;
    }else{
        text = `Thank you for your vote!`;
    }

    return `${text}`;
}

export default front_date_formater;