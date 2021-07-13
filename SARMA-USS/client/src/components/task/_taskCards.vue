<template>
 <div v-for="(task, idx) in tasks" :key="task.id" class="card mb-2">
    <div class="card-body">
      <div class="row">
        <div class="col-4">
          
            <strong>№</strong>&nbsp;
            <router-link :to="{ path: `/${task.id}` }" >  
              {{idx+1}} 
              <span class="badge bg-danger">В работе</span>             
            </router-link>
          
	        <div><strong>От: </strong>admin</div>	  
    	    <div><strong>Срочность: </strong> {{showPriority(task.priority)}}	</div>
	        <div><strong>Открыта: </strong> 23.06.2021 10:00	</div>
	  	    <div><strong>Закрыта: </strong> Нет даты </div>	
        </div>
        <div class="col-8">
          <div><b>Тип: </b>{{showType(task.type)}}</div>
  	      <div>
            <b>Описание: </b>{{task.description}}
          </div>        
		      <!-- <div class="alert alert-success">
	    	    <b>Комментарий: </b>Сломался блок питания		<br /> 
          </div>   -->
        </div>
      </div>  
    </div>
  </div>

  <!-- <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav> -->

</template>

<script>
import {showType} from '../../utils/showType'
import {showPriority} from '../../utils/showPriority'

export default({
  props: ['tasks'],
  setup() {

    return {showType, showPriority}  
  },
})
</script>
