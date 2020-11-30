import {TestBed} from '@angular/core/testing';

import {LoggedUserPermissionsService} from './logged-user-permissions.service';

describe('LoggedUserPermissionsService', () => {
    let service: LoggedUserPermissionsService;
    
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LoggedUserPermissionsService);
    });
    
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
