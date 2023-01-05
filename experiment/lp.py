import matplotlib.pyplot as plt
import math

downPool = 1000000
settle_ratio = 0.95
# price = 1.1

fig, (ax1, ax2) = plt.subplots(2)

#An LP comes with $ (10+10*(1-s))*capital. He buys capital UP, capital DOWN. Then, he exchanges capital DOWN tokens until $10*(1-s)*capital/capital-j DOWN equals to price of the pool
# He keeps the earned money with himself. 
for k in range(10):
	price = (10*(1-settle_ratio))*(1+ k/10)
	dollarPool = price*downPool
	x_axis = []
	y_axis_op = []
	y_axis_pe = []
	for i in range(20):
		capital = ((i+1)/10)*downPool
		j = 0
		while True:
			if (10*(1-settle_ratio)*capital)/(capital-j) > price*downPool*downPool/((downPool+j)*(downPool+j)):
				break
			j+=1
		initialSwap = downPool*price*j/(downPool+j)
		fractionOwned = (capital-j)/(downPool+capital-j)
		product = (downPool+capital-j)*(downPool*price + 10*(1-settle_ratio)*capital)
		finalValueOp = 2*fractionOwned*math.sqrt(product*10*(1-settle_ratio))
		totalFinalValueOp = (finalValueOp + initialSwap + 10*settle_ratio*capital)/((10+10*(1-settle_ratio))*capital)
		finalValuePe = 2*fractionOwned*math.sqrt(product*10*settle_ratio)
		totalFinalValuePe = (finalValuePe + initialSwap + 10*(1-settle_ratio)*capital)/((10+10*(1-settle_ratio))*capital)
		x_axis.append(capital/downPool)
		y_axis_op.append(totalFinalValueOp)
		y_axis_pe.append(totalFinalValuePe)
		# print(k, totalFinalValueOp)
	ax1.plot(x_axis, y_axis_op, label = "price:{}".format(float(math.ceil(100*price))/100))
	ax2.plot(x_axis, y_axis_pe, label = "price:{}".format(float(math.ceil(100*price))/100))	
# plt.xlabel('fraction owned')
# plt.ylabel('profit')
fig.text(0.5, 0.04, 'fraction owned', ha='center')
fig.text(0.01, 0.5, 'profit', va='center', rotation='vertical')
# plt.xlim(0,1.4)
ax1.set_title('LP profit at multiple entry prices (optimistic outcome, s={})'.format(settle_ratio),fontsize=8)
ax2.set_title('LP profit at multiple entry prices (pessimistic outcome, s={})'.format(settle_ratio),fontsize=8)
plt.legend(bbox_to_anchor=(1.05, 1.0), loc='best')
fig.tight_layout(pad=2)
plt.savefig('LP-s95.png')
# plt.show()

# for i in range(100):
	# price = 1+ i/100

