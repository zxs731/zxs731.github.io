
var HelloWorldLayer = cc.Layer.extend({
    road:null,
    car:null,
    sprite:null,
    da:0,
    leftWheel:0,
    rightWheel:0,
    wheel:0,
    up:1,
    start:1,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;
/*
        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = 0;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);
*/
        // add "HelloWorld" splash screen"

        var self=this;
        //button
        var run = new ccui.CheckBox(res.Run,res.Stop);
        run.setTouchEnabled(true);
        //btn.setPressedActionEnabled(false);
        //btn.loadTextures(res.Up,res.Down,res.Down);
        run.x = 30;
        run.y = 100;
        run.addEventListener(function (sender, type) {
 
          switch (type) {
              case ccui.CheckBox.EVENT_SELECTED:
              self.start=(-1)*self.start;
              cc.log(self.start);
                  break;
              case ccui.CheckBox.EVENT_UNSELECTED:
              self.start=(-1)*self.start;
                  break;
              default:
                  break;
          }
        
      }, this);

        var btn = new ccui.CheckBox(res.Up,res.Down);
        btn.setTouchEnabled(true);
        //btn.setPressedActionEnabled(false);
        //btn.loadTextures(res.Up,res.Down,res.Down);
        btn.x = 100;
        btn.y = 100;
        /*
        btn.addClickEventListener(function(){
            self.up=(-1)*self.up;

            cc.log(self.up);
        },this);
        */
        btn.addEventListener(function (sender, type) {

          switch (type) {
              case ccui.CheckBox.EVENT_SELECTED:
              self.up=(-1)*self.up;
                  //this._topDisplayText.setString("Selected");
                  cc.log("checkbox select");
                  //this.image.setVisible(true);
                  cc.log(self.image);
                  break;
              case ccui.CheckBox.EVENT_UNSELECTED:
              self.up=(-1)*self.up;
                  //this._topDisplayText.setString("Unselected");
                  cc.log("checkbox unselect");
                 // this.image.setVisible(false);
                  cc.log(self.image);
                  break;
  
              default:
                  break;
          }
      }, this);

        this.addChild(btn);
this.addChild(run);
        //road
        this.road = new cc.Sprite(res.Road_png);
        this.road.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 1,
            rotation: 0
        });
        this.addChild(this.road, 0);
        //car
        this.car = new cc.Sprite(res.Car_png);
        this.car.attr({
            x: size.width / 3*2,
            y: size.height / 3,
            scale: 1,
            rotation: 0
        });
        this.car.x=this.road.x+this.road.width/2-this.car.width;
        this.addChild(this.car, 0);
        //wheel
        this.sprite = new cc.Sprite(res.Wheel_png);
        this.sprite.attr({
            x: size.width / 3,
            y: size.height / 4,
            scale: 1,
            rotation: 0
        });
        this.addChild(this.sprite, 0);
/*
        this.sprite.runAction(
            cc.sequence(
                cc.rotateTo(2, 0),
                cc.scaleTo(2, 1, 1)
            )
        );
        helloLabel.runAction(
            cc.spawn(
                cc.moveBy(2.5, cc.p(0, size.height - 40)),
                cc.tintTo(2.5,255,125,0)
            )
        );
        */
        this.scheduleUpdate();
        return true;
    },
    getDistance:function(pos1,pos2){
       var dx=pos2.x-pos1.x;
       var dy=pos2.y-pos1.y;
       return Math.sqrt(dx*dx+dy*dy);
    },
    getAngle:function(dy,dx){
        var s=dy/dx;
        //cc.log(s);

    },
    onEnter:function () {
        this._super();
        var self=this;
        var listener=cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan:function(touch,event){
                var target=event.getCurrentTarget();
                var action=cc.rotateBy(1,90);
                var loc=touch.getLocation();
                var touchPosDis=self.getDistance(loc,target);
                var rad=target.width/2;
                if (rad>=touchPosDis) {
                   // target.runAction(action);
                    return true;
                };
                
                
               // cc.log(touchPosDis);
               // cc.log();
            },
            onTouchMoved:function(touch,event){
                var target=event.getCurrentTarget();
                var pos0=touch.getPreviousLocation();
                var pos1=touch.getLocation();
                var angleR0=Math.atan2(pos0.x-target.x,pos0.y-target.y);
                var angleR1=Math.atan2(pos1.x-target.x,pos1.y-target.y);
                var rate=180/Math.PI;
                var angle0=angleR0*rate;
                var angle1=angleR1*rate;
                var a=angle1-angle0;
                if (a>0 && self.wheel+Math.abs(a>300?a-360:a)<540 ) {
                    //self.rightWheel+=Math.abs(a>300?a-360:a);
                    self.wheel+=Math.abs(a>300?a-360:a);
                    target.rotation+=angle1-angle0;
                }else if(a<0 && self.wheel-Math.abs(a<-300?a+360:a)>-540 ){
                    //self.leftWheel+=Math.abs(a<-300?a+360:a);
                    self.wheel+=(-1)*Math.abs(a<-300?a+360:a);
                    target.rotation+=angle1-angle0;
                };
                /*
                self.da+=a>300?a-360:a;
                if (self.wheel>-540 && self.wheel<540) {
                    target.rotation+=angle1-angle0;
                };
                */
    //            cc.log(self.wheel);
                //cc.log("rightWheel:"+self.rightWheel+" ,leftWheel:"+self.leftWheel);
            },
            onTouchEnded:function(touch,event){

            }
        });
        cc.eventManager.addListener(listener,this.sprite);
    },
    update:function(dt){
        //
        var self=this;
        if (self.start==-1) {
            return;
        };
        var r=cc.degreesToRadians(this.car.rotation);
        //var dy=Math.cos(r);
        if (self.up==1) {
            this.car.x+= 0.2*Math.sin(r);
            this.car.y+= 0.2*Math.cos(r);
        }else{
            this.car.x+= -0.2*Math.sin(r);
            this.car.y+= -0.2*Math.cos(r);//(dy>0?dy:(-1)*dy);
        };
        
        this.car.rotation+=self.up*0.01*self.wheel/18;
        if (this.car.x>cc.winSize.width+this.car.height) {
            this.car.x=0-this.car.height;
        };
        if (this.car.x<0-this.car.height) {
            this.car.x=cc.winSize.width+this.car.height;
        };
        if (this.car.y>cc.winSize.height+this.car.height) {
            this.car.y=0-this.car.height;
        };
        if (this.car.y<0-this.car.height) {
            this.car.y=cc.winSize.height+this.car.height;
        };
       
      //  cc.log(cc.winSize);
       // this.car.y+=0.2;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});


