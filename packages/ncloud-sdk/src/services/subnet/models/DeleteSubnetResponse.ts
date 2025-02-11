import { NcloudResponse } from './NcloudResponse';
import { SubnetList } from './SubnetList';

/**
 * 서브넷 삭제를 위한 응답 객체
 */
export interface DeleteSubnetResponse extends NcloudResponse, SubnetList {}
