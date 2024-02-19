// Copyright (c) 2021-2023 FlyByWire Simulations
//
// SPDX-License-Identifier: GPL-3.0

/* eslint-disable max-len */
import React, { useState } from 'react';
import { Units, useSimVar } from '@flybywiresim/fbw-sdk';
import { getAirframeType } from '../../../Efb';
import { isSimbriefDataLoaded } from '../../../Store/features/simBrief';
import { A330Fuel } from './A330_941/A330Fuel';
import { useAppSelector } from '../../../Store/store';

export const Fuel = () => {
    const [isOnGround] = useSimVar('SIM ON GROUND', 'Bool', 8_059);
    const simbriefUnits = useAppSelector((state) => state.simbrief.data.units);
    const simbriefPlanRamp = useAppSelector((state) => state.simbrief.data.fuels.planRamp);

    const simbriefDataLoaded = isSimbriefDataLoaded();

    const [massUnitForDisplay] = useState(Units.usingMetric ? 'KGS' : 'LBS');
    const [convertUnit] = useState(Units.usingMetric ? 1 : (1 / 0.4535934));

    switch (getAirframeType()) {
    case 'ACJ330_941':
    case 'A330_941':
    default:
        return (
            <A330Fuel
                simbriefDataLoaded={simbriefDataLoaded}
                simbriefUnits={simbriefUnits}
                simbriefPlanRamp={simbriefPlanRamp}
                massUnitForDisplay={massUnitForDisplay}
                convertUnit={convertUnit}
                isOnGround={isOnGround}
            />
        );
    }
};
