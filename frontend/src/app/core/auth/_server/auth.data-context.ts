
import { PermissionsTable } from './permissions.table';
import { RolesTable } from './roles.table';

// Wrapper class
export class AuthDataContext {
	
	public static roles: any = RolesTable.roles;
	public static permissions = PermissionsTable.permissions;
}
