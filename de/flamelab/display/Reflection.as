package de.flamelab.display{
	
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.DisplayObject;
	import flash.display.GradientType;
	import flash.display.SpreadMethod;
	import flash.display.Sprite;
	import flash.geom.Matrix;
	
	
	public class Reflection extends Sprite{
		
		private var _target:Sprite;
		private var _bitmap:BitmapData;
		private var _reflection:Bitmap;
		private var _gradientMask:Sprite;
		private var _bounds:Object;
		private var _distance:Number = 0;
		private var _alpha:Number = 0;
		private var _ratio:Number = 0;
		private var _dropoff:Number = 0;
		
		public function Reflection(args:Object){
			
			_target = args.target;
			
			_alpha = args.alpha / 100;
			_ratio = args.ration;
			_dropoff = args.dropoff;
			_distance = args.distance;

		}
		
		public function render():void{
			
			_bounds = new Object();
			_bounds.width = _target.width;
			_bounds.height = _target.height;
			
			
			_bitmap = new BitmapData(_bounds.width, _bounds.height, true, 0xffffff);
			_bitmap.draw(_target);
			
			_reflection = new Bitmap(_bitmap);
			_reflection.scaleY = -1;
			_reflection.y = (_bounds.height * 2) + _distance;
				
			var _reflectionRef:DisplayObject = _target.addChild(_reflection);
			_reflectionRef.name = "reflection";
			
			var gradientMaskRef:DisplayObject = _target.addChild(new Sprite());
			gradientMaskRef.name = "gradientMask";
			_gradientMask = _target.getChildByName("gradientMask") as Sprite;
			
			var fillType:String = GradientType.LINEAR;
			var colors:Array = [0xFFFFFF, 0xFFFFFF];
			var alphas:Array = [_alpha, 0];
			var ratios:Array = [0, _ratio];
			var spreadMethod:String = SpreadMethod.REFLECT;
			
			var matr:Matrix = new Matrix();
			var matrixHeight:Number;
			if (_dropoff <= 0) {
				matrixHeight = _bounds.height;
			}
			else {
				matrixHeight = _bounds.height / _dropoff;
			}
			
			matr.createGradientBox(_bounds.width, matrixHeight,(90/180)*Math.PI, 0, 0);
						
			_gradientMask.graphics.beginGradientFill(fillType, colors, alphas, ratios, matr, spreadMethod); 
			_gradientMask.graphics.drawRect(0,0,_bounds.width, _bounds.height);
		
			_gradientMask.y = _target.getChildByName("reflection").y - _target.getChildByName("reflection").height;
			
			
  			_gradientMask.cacheAsBitmap = true;
  			_target.getChildByName("reflection").cacheAsBitmap = true;

  			_target.getChildByName("reflection").mask = _gradientMask;
  		
			
		} 

	}
}