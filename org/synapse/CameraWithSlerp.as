
package {
//a helper class whose sole purpose is to add the slerp property
//I use this for the sake of brevity, but for production code
//you would move this into a new ActionScript file
	import org.papervision3d.cameras.Camera3D;
	
	public class CameraWithSlerp extends Camera3D {
		public var slerp:Number = 0;
	}

}

