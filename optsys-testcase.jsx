﻿#target Photoshop/*   Photoshop Javascripting Option System - testcase   Copyright (c) 2011, SjG <samuelg@fogbound.net>   All Rights Reserved*/   #include "./optsys.jsx";var optconf = {	'fields':{		'counter':{             'input':'text',			'label':'Number of Things',			'default':10,			},		'field2':{             'input':'text',			'label':'Your Name',			'default':'Arsène Lupin',			},		'field3':{             'input':'text',			'label':'None',			'default':0,			},		'field4':{ 			'input':'text',			'label':'Field 4',			'default':0,			},		'field5':{			'label':'Another Text Field',			'default':0,			'input':'text'			},		'radio1':{ 		   'input':'radio',			'label':'Pick One',			'default':'beauty',            // advanced radio button can toggle the state of panels			'options':{'truth':{'label':'Truth','tag':'optpanel','state':'truth'},                    'beauty':{'label':'Beauty','tag':'optpanel','state':'beauty'},                    'phil':{'label':'Philosophy','tag':'optpanel','state':'phil'},                    }			},		'radio2':{             'input':'radio',			'label':'Pick Another',			'default':'good',              // simple radio buttons are an array of value:Label pairs			'options':{'good':'Good','evil':'Evil'},			},		'check':{             'input':'checkbox',			'label':'Check Me To Set True',			'shortlabel':'Check Me',			'default':false,			},		'check2':{			'input':'checkbox',			'label':'I Am True',			'shortlabel':'Yes!',			'default':true,			},		'slider1':{            'input':'slider',			'label':'Maximum Things',			'default':0,			'min':-100,			'max':100,			'numbertype':'int'			},		'slider2':{            'input':'slider',			'label':'Maximum Overdrive',			'default':0,			'min':0,			'max':1,			'numbertype':'float'			},         'note':{             'input':'static',             'label':'Just a note',             'value':'Remember to call your mother.'             },        'truenote':{             'input':'static',             'label':'Reminder',             'value':'You have selected True.'             },        'philnote':{             'input':'static',             'label':'Reminder',             'value':'You have selected Philosophy.'             },        'beautynote':{             'input':'static',             'label':'Reminder',             'value':'You have selected Beauty.'             },         'philradio':{             'input':'radio',             'label':'Secret Options',             'default':'stoic',			'options':{'stoic':'Stoicism','epic':'Epicureanism','ant':'Antinomianism'},             }		},	'ui':{		'title':'Options',		'width':650,		'fieldsets':[			{				'title':'Two Inputs',				'columns':[					['counter'],					['check','check2']					]			},			{				'title':'Another Input',				'columns':[					['field2','field3']				]			},			{				'title':'New Input Types',				'columns':[					['radio1','radio2']				]			},			{				'title':'Slidas',				'columns':[					['slider1','slider2', 'note']				]			},             {                 'tag':'optpanel',                 'state':'truth',                 'title':'Truth Options',                 'columns':[                    ['truenote']                  ]             },             {                 'tag':'optpanel',                 'state':'phil',                 'title':'Philsophy Options',                 'columns':[                    ['philnote','philradio']                  ]             },             {                 'tag':'optpanel',                 'state':'beauty',                 'title':'Beauty Options',                 'columns':[                    ['beautynote']                  ]             },              {                 'title':'Post Alternates',                 'columns':[                    ['field4']                 ]             }			]		}};	  var opts = new OptObject(optconf);if (opts.doDialog(optconf))	{	alert("Hooray!");	}opts.writeToMetadata('TestCase Option values');