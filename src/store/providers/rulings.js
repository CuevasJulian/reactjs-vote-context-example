import React, { useEffect, useState } from 'react';
import { RulingContext } from '@store';
import { DataDefault } from '@utils';
// localStorage.removeItem('data_rulings')
const RulingProvider = ( props ) => {
    const { children } = props;
    const [ rulingItems, setRulingItems ] = useState({
        data:!localStorage.getItem('data_rulings') ? DataDefault : JSON.parse(localStorage.getItem('data_rulings'))
    });

    useEffect(() => {
        if(!localStorage.getItem('data_rulings')) {
            localStorage.setItem('data_rulings',JSON.stringify(rulingItems.data));
        }else if(JSON.stringify(rulingItems.data) != localStorage.getItem('data_rulings')){
            localStorage.setItem('data_rulings',JSON.stringify(rulingItems.data));
        }
    },[rulingItems]);

    return(
        <RulingContext.Provider value={{
            rulingItems:rulingItems,
            setRulingItems:setRulingItems
        }}>
            {children}
        </RulingContext.Provider>
    );
}

export default RulingProvider;