type ReferenceMap = Map<string, string>;

export const resolveReference = (
    placeholder: string,
    resourceNameMap: ReferenceMap,
): string => {
    const references: { [key: string]: string } = {
        VPC_ID_PLACEHOLDER: `ncloud_vpc.${resourceNameMap.get('ncloud_vpc')}.id`,
        VPC_ACL_PLACEHOLDER: `ncloud_vpc.${resourceNameMap.get('ncloud_vpc')}.default_network_acl_no`,
        SUBNET_ID_PLACEHOLDER: `ncloud_subnet.${resourceNameMap.get('ncloud_subnet')}.id`,
        ACG_ID_PLACEHOLDER: `ncloud_access_control_group.${resourceNameMap.get('ncloud_access_control_group')}.id`,
        LOGIN_KEY_NAME_PLACEHOLDER: `ncloud_login_key.${resourceNameMap.get('ncloud_login_key')}.key_name`,
        NIC_ID_PLACEHOLDER: `ncloud_network_interface.${resourceNameMap.get('ncloud_network_interface')}.id`,
        SERVER_ID_PLACEHOLDER: `ncloud_server.${resourceNameMap.get('ncloud_server')}.id`,
    };

    return references[placeholder] || placeholder;
};

export const replaceReferences = (
    properties: { [key: string]: any },
    resourceNameMap: ReferenceMap,
): { [key: string]: any } => {
    const result = { ...properties };

    for (const [key, value] of Object.entries(result)) {
        if (typeof value === 'string') {
            result[key] = resolveReference(value, resourceNameMap);
        } else if (Array.isArray(value)) {
            result[key] = value.map((item) =>
                typeof item === 'string'
                    ? resolveReference(item, resourceNameMap)
                    : replaceReferences({ value: item }, resourceNameMap).value,
            );
        } else if (typeof value === 'object' && value !== null) {
            result[key] = replaceReferences(value, resourceNameMap);
        }
    }

    return result;
};
