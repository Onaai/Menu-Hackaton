export type OrderStatus = "RECEIVED" | "PREPARING" | "READY" | "DELIVERED";
export type PaymentMode = "INDIVIDUAL" | "TABLE";

export interface MenuItem { id: string; name: string; description: string; category: string; priceInCents: number; available: boolean; diet?: string[]; }
export interface Diner { id: string; name: string; joinedAt: string; }
export interface OrderItem { menuItemId: string; name: string; unitPriceInCents: number; quantity: number; note?: string; }
export interface Order { id: string; sessionId: string; dinerId: string; type: "INITIAL" | "ADDITIONAL"; status: OrderStatus; items: OrderItem[]; note?: string; createdAt: string; updatedAt: string; }
export interface KitchenOrder extends Order { tableNumber: number; dinerName: string; }
export interface BillSummary { sessionId: string; tableNumber: number; sessionStatus: TableSession["status"]; subtotalInCents: number; tipPercent: number; tipInCents: number; totalInCents: number; diners: Array<{ dinerId: string; dinerName: string; subtotalInCents: number; paid: boolean }>; }
export interface PaymentEvaluation { provider: "WDK" | "SIMULATED_FALLBACK"; decision: "ALLOW" | "DENY"; reason: string; policyId: string; matchedRule: string; network: "ethereum-sepolia"; asset: "USDt-testnet"; amountInBaseUnits: string; broadcast: false; }
export interface SimulatedPayment { id: string; mode: PaymentMode; dinerId?: string; totalInCents: number; tipPercent: number; status: "SIMULATED_APPROVED"; policyEvaluation: PaymentEvaluation & { decision: "ALLOW" }; }
export interface WdkCliPayment { id: string; mode: PaymentMode; dinerId?: string; subtotalInCents: number; tipPercent: number; tipInCents: number; totalInCents: number; status: "WDK_CLI_BROADCAST"; network: "sepolia"; asset: "USDT"; fromWallet: string; fromAddress: string; toWallet: string; toAddress: string; amount: string; transactionHash: string | null; balanceBefore: WalletBalances; balanceAfter: WalletBalances; createdAt: string; }
export type PaymentRecord = SimulatedPayment | WdkCliPayment;
export interface TableSession { id: string; tableNumber: number; status: "OPEN" | "BILL_REQUESTED" | "CLOSED"; diners: Diner[]; orders: Order[]; payments: PaymentRecord[]; openedAt: string; updatedAt: string; }

export interface WalletProfile { role: "CLIENT" | "BUSINESS"; walletName: string; network: "sepolia"; asset: "USDT"; address: string; balance: string | null; unlocked: boolean | null; }
export interface WalletPair { client: WalletProfile; business: WalletProfile; }
export interface WalletBalances { client: string | null; business: string | null; }
export interface CheckoutPreview { previewId: string; expiresAt: string; network: "sepolia"; asset: "USDT"; fromWallet: string; fromAddress: string; toWallet: string; toAddress: string; amount: string; balanceBefore: WalletBalances; dryRun: true; cliResult: unknown; }
export interface CheckoutPreviewResponse { policyEvaluation: PaymentEvaluation; preview: CheckoutPreview; }
export interface CorteMetodo { cantidad: number; totalInCents: number }
export interface FinancialSummary { payments: number; clientExpensesInCents: number; businessRevenueInCents: number; tipsInCents: number; usdtReceived: string | null; businessProfitInCents: null; profitReason: string; porMetodo?: { wallet: CorteMetodo; efectivo: CorteMetodo & { recibidoInCents: number; vueltoInCents: number; enElCajon: number }; mercadoPago: CorteMetodo & { simulado: boolean } } }
export interface MenuAssistantResponse { engine: "QVAC_LOCAL" | "LOCAL_RECOMMENDATION_RULES"; title: string; message: string; items: MenuItem[]; note: string; motivos?: Record<string, string>; descartadas?: Array<{ texto: string; razon: string }>; }

export interface PasoTraza { numero: number; pensamiento: string; accion: string; argumentos: Record<string, unknown>; resultado: string; bloqueado: boolean; latenciaMs: number; }
export interface RespuestaAgente { respuesta: string; traza: PasoTraza[]; cierre: "respondio" | "sin-pasos" | "sin-modelo"; cotizacion: unknown | null; latenciaTotalMs: number; }
export interface PoliticasAgente { topePorOperacion: number; topeDiario: number; destinatariosPermitidos: string[]; maxPasos: number; }
export interface EstadoAgente { politicas?: PoliticasAgente; gastadoHoy?: number; disponibleHoy?: number; dia?: string; accionesDelAgente?: string[]; transmitir?: string; disponible?: boolean; motivo?: string; }

export interface LlamadaPendiente { id: string; dinerId: string; dinerName: string; motivo: string; creadaEn: string; atendidaEn?: string; sessionId: string; tableNumber: number; }
