<?php

namespace App\Events;


use App\Repository\InvoiceRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserLogoSubscriber implements EventSubscriberInterface {

    private $security;
    private $userRepository;

    public function __construct(Security $security, UserRepository $userRepository )
    {
        $this->security = $security;
        $this->userRepository = $userRepository;

    }
    
    
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserLogo', EventPriorities::PRE_VALIDATE ]
        ];
    }

    public function setUserLogo(ViewEvent $event){

        
        
        $user = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        

        if($user instanceof User && $method === "PUT")
        {
        //     //on a besoin de l'utilisateur actuellement connecté (security)
        //     // on a besoin du repository des factures (InvoiceRepository)
        //     //recuperer la derniere facture qui a été inserée et choper son InvNumber
        //     // incrementer l'InvNumber de la nouvelle facture au dernier invNumber récupéré

        //     // $nextInvNumber = $this->invoiceRepository->findNextInvNumber($this->security->getUser());
        //     // $invoice->setInvNumber($nextInvNumber);

        //     // if(empty($invoice->getSentAt())){
        //     //     $invoice->setSentAt(new DateTime());

             // debut code pour ajouter une photo
             
             
             $logo = $event->getControllerResult()->getLogo();
             $uploads_dir = "%kernel.project_dir%/public/images/";
             if (!is_null($logo)) {
                 //je crée un nouveau nom unique pour l'image
                 
                 $logo_new_name = $user->getId().$logo;
                 
                 //j'envoie la photo à notre dossier public/photos
                 $logo->move($uploads_dir,$logo_new_name );
                 
                 //j'envoie à la BDD le même nom que le serveur
                 $user->setLogo($logo_new_name);
             }

            }

        

        
    }
}