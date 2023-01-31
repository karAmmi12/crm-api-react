<?php

namespace App\Events;


use DateTime;
use App\Entity\Invoice;
use App\Repository\InvoiceDetailRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\InvoiceDetail;
use App\Repository\InvoiceRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class InvoiceDetailsSubscriber implements EventSubscriberInterface {

    private $security;
    private $invoiceDetailRepository;

    public function __construct(Security $security, InvoiceDetailRepository $invoiceDetailRepository, InvoiceRepository $invoiceRepository)
    {
        $this->security = $security;
        $this->invoiceDetailRepository = $invoiceDetailRepository;
        $this->invoiceRepository = $invoiceRepository;
    }
    
    
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setItemAmount', EventPriorities::PRE_WRITE ]
        ];
    }

    public function setItemAmount(ViewEvent $event){

        
        
        $item = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if($item instanceof InvoiceDetail && ($method === "POST"))
        {
            
            $price = $item->getPrice();
            $quantity=$item->getQuantity();
            $itemAmount=$price*$quantity;

            $item->setItemAmount($itemAmount);

            

            $invoice = $this->invoiceRepository->findOneBySomeField($item->getInvoice()->getId());
            
            $amount = $invoice->getAmount();
            $newAmount = $amount + $itemAmount;
            
            $invoice->setAmount($newAmount);

            

        }
        if($item instanceof InvoiceDetail && $method === "DELETE")
        {
            
            $itemAmount=$item->getItemAmount();

            $invoice = $this->invoiceRepository->findOneBySomeField($item->getInvoice()->getId());
            $amount = $invoice->getAmount();
            $newAmount = $amount - $itemAmount;
            $invoice->setAmount($newAmount);
            

        }
        if($item instanceof InvoiceDetail && ($method === "PUT"))
        {
            //dd($item);
            $price = $item->getPrice();
            $quantity=$item->getQuantity();
            $oldItemAmount = $item->getItemAmount();
            $itemAmount=$price*$quantity;

            $item->setItemAmount($itemAmount);

            $invoice = $this->invoiceRepository->findOneBySomeField($item->getInvoice()->getId());
            //$detailInvoice = $this->invoiceDetailRepository->findOneBySomeField($item->getId());
            //$oldItemAmount = $detailInvoice->getItemAmount();
            $amount = $invoice->getAmount();
            
            $newAmount = $amount - $oldItemAmount + $itemAmount;
            
            $invoice->setAmount($newAmount);

            

        }
        
        

        
    }
}