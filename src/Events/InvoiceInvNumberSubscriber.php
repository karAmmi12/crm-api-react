<?php

namespace App\Events;


use App\Repository\InvoiceRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Invoice;
use DateTime;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class InvoiceInvNumberSubscriber implements EventSubscriberInterface {

    private $security;
    private $invoiceRepository;

    public function __construct(Security $security, InvoiceRepository $invoiceRepository)
    {
        $this->security = $security;
        $this->invoiceRepository = $invoiceRepository;
    }
    
    
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setInvNumberForInvoice', EventPriorities::PRE_VALIDATE ]
        ];
    }

    public function setInvNumberForInvoice(ViewEvent $event){

        
        
        $invoice = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if($invoice instanceof Invoice && $method === "POST")
        {
            
            //on a besoin de l'utilisateur actuellement connecté (security)
            // on a besoin du repository des factures (InvoiceRepository)
            //recuperer la derniere facture qui a été inserée et choper son InvNumber
            // incrementer l'InvNumber de la nouvelle facture au dernier invNumber récupéré
            
        
            
           

            $nextInvNumber = $this->invoiceRepository->findNextInvNumber($this->security->getUser());
            $invoice->setInvNumber($nextInvNumber);
          

            if(empty($invoice->getSentAt())){
                $invoice->setSentAt(new DateTime());
            }

        }
        

        
    }
}