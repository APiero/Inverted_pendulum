function PendulumSim(length_m, gravity_mps2, initialAngle_rad, initialVelocity_rad_s, timestep_ms, callback) {
    var velocity = initialVelocity_rad_s;
    var angle = initialAngle_rad;
    var k = -gravity_mps2/length_m;
    var timestep_s = timestep_ms / 1000;
    return setInterval(function () {
      var acceleration = k * Math.sin(angle);
      velocity += acceleration * timestep_s;
      angle    += velocity     * timestep_s;
      callback(angle);
    }, timestep_ms);
  }
 
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var prev=0;
  var sim = PendulumSim(1, 9.80665, Math.PI*0.85, 1.4, 5, function (angle) {
    var rPend = Math.min(canvas.width, canvas.height) * 0.47;
    var rBall = Math.min(canvas.width, canvas.height) * 0.03;
    var rBar = Math.min(canvas.width, canvas.height) * 0.005;
    var ballX = Math.sin(angle) * rPend;
    var ballY = Math.cos(angle) * rPend;
 
    context.fillStyle = "rgba(255,255,255,1)";
    context.globalCompositeOperation = "destination-out";
    context.fillRect(0, 0, canvas.width, canvas.height);
 
    context.fillStyle = "yellow";
    context.strokeStyle = "rgba(0,0,0,"+Math.max(0,1-Math.abs(prev-angle)*10)+")";
    context.globalCompositeOperation = "source-over";
 
    context.save();
      context.translate(canvas.width/2, canvas.height/2);
      context.rotate(angle);
 
      context.beginPath();
      context.rect(-rBar, -rBar, rBar*2, rPend+rBar*2);
      context.fill();
      context.stroke();
 
      context.beginPath();
      context.arc(0, rPend, rBall, 0, Math.PI*2, false);
      context.fill();
      context.stroke();
    context.restore();
    prev=angle;
  });