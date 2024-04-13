interface EnergyUseRecord {
    _id: string;
    meter_reading: number;
    date: string;
    price_on_the_day: number;
}

interface RecordCollection {
    year: number;
    records: EnergyUseRecord[];
}


export type { EnergyUseRecord, RecordCollection }
