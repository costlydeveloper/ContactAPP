import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'avatarLetter'
})
export class AvatarLetterPipe implements PipeTransform {
    
    transform(_Surname: string, _Name: string, _Size: number = 36, _Color: string = '#888888', _Background: string = '#dddddd'): string {
        
        const canvas  = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        let initials = '';
        if (_Surname) {
            initials += _Surname.charAt(0).toUpperCase();
        }
        
        if (_Name) {
            initials += _Name.charAt(0).toUpperCase();
        }
        if (!_Surname && !_Name) {
            initials = '-';
        }
        
        const canvasWidth     = canvas.setAttribute('width', String(_Size)),
              canvasHeight    = canvas.setAttribute('height', String(_Size)),
              canvasCssWidth  = _Size,
              canvasCssHeight = _Size;
        
        if (window.devicePixelRatio) {
            canvas.setAttribute('width', String(_Size));
            canvas.setAttribute('height', String(_Size));
            
            const style  = canvas.style;
            style.width  = String(_Size);
            style.height = String(_Size);
            context.scale(1, 1);
            context.fillStyle = _Background;
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.textAlign = 'center';
            context.fillStyle = _Color;
            
            if (_Size < 33) {
                context.font = '14px Source Sans Pro, sans-serif';
                context.fillText(initials, canvasCssWidth / 2, canvasCssHeight / 1.5);
            } else if ((_Size >= 30) && (_Size < 60)) {
                context.font = '18px Source Sans Pro, sans-serif';
                context.fillText(initials, canvasCssWidth / 2, canvasCssHeight / 1.6);
            } else if ((_Size >= 60) && (_Size < 200)) {
                context.font = '20px Source Sans Pro, sans-serif';
                context.fillText(initials, canvasCssWidth / 2, canvasCssHeight / 1.6);
            } else {
                context.font = '50px Source Sans Pro, sans-serif';
                context.fillText(initials, canvasCssWidth / 2, canvasCssHeight / 1.6);
            }
            
            
            return canvas.toDataURL();
        }
    }
    
}
