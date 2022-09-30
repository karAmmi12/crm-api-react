<?php

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber {
    public function updateJwtData(JWTCreatedEvent $event){

       
        //récuperer l'utilsateur pour avoir son firstName et lastName
        $user = $event->getUser();

        //enrichir les data pour qu'elles contiennent ces données
        $data = $event->getData();
        $data['firstName'] = $user->getFirstName();
        $data['lastName'] = $user->getLastName();
        $data['userId'] = $user->getId();


        $event->setData($data);
        


    }
}