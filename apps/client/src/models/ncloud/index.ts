import { Group, Node } from '@types';

export const NcloudNodeFactory = (type: string) => {
    switch (type) {
        case 'server':
            return Server;
        case 'cloud-function':
            return CloudFunction;
        case 'db-mysql':
            return MySQLDB;
        default: {
            throw new Error(`Unknown type: ${type}`);
        }
    }
};

export const NcloudGroupFactory = (type: string) => {
    switch (type) {
        case 'region':
            return Region;
        default: {
            throw new Error(`Unknown type: ${type}`);
        }
    }
};

const Server: Node = {
    id: '',
    name: '',
    type: 'server',
    point: { x: 0, y: 0 },
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 128, height: 111 },
    },
    properties: {
        region: '',
        subnet: '',
        vpc: '',
    },
    connectors: {},
};

const CloudFunction: Node = {
    id: '',
    type: 'cloud-function',
    name: '',
    point: { x: 0, y: 0 },
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 96, height: 113.438, offset: 10 },
    },
    properties: {
        region: '',
        subnet: '',
        vpc: '',
    },
    connectors: {},
};

const MySQLDB: Node = {
    id: '',
    type: 'db-mysql',
    name: '',
    point: { x: 0, y: 0 },
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 128, height: 137.5 },
    },
    properties: {
        vpc: '',
        subnet: '',
        region: '',
    },
    connectors: {},
};

const Region: Group = {
    id: 'region1',
    type: 'region',
    name: 'KR-1',
    nodeIds: [],
    properties: {
        regionCode: '',
    },
    childGroupIds: [],
};
