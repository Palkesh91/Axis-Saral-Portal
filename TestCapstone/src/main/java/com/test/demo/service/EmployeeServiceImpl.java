package com.test.demo.service;

import java.util.ArrayList;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import com.test.demo.dto.EmpProjDto;
import com.test.demo.dto.EmployeeDto;
import com.test.demo.dto.FeedbackDto;
import com.test.demo.dto.JobDto;
import com.test.demo.dto.NewsfeedDto;
import com.test.demo.dto.ProjectDetailsDto;
import com.test.demo.dto.ProjectDto;
import com.test.demo.email.EmailSendService;
import com.test.demo.entities.Comments;
import com.test.demo.entities.Document;
import com.test.demo.entities.Employee;
import com.test.demo.entities.EmployeeProject;
import com.test.demo.entities.Feedback;
import com.test.demo.entities.JobVacancy;
import com.test.demo.entities.NewsFeed;
import com.test.demo.entities.Owner;
import com.test.demo.entities.Policies;
import com.test.demo.entities.Project;
import com.test.demo.entities.StakeHolder;
import com.test.demo.exceptions.AlreadyThere;
import com.test.demo.exceptions.NotFound;
import com.test.demo.repo.CommentRepo;
import com.test.demo.repo.EmpProjectRepo;
import com.test.demo.repo.EmployeeRepo;
import com.test.demo.repo.FeedbackRepo;
import com.test.demo.repo.FilesRepo;
import com.test.demo.repo.JobVacancyRepo;
import com.test.demo.repo.NewsfeedRepo;
import com.test.demo.repo.OwnerRepo;
import com.test.demo.repo.PolicyRepo;
import com.test.demo.repo.ProjectRepo;
import com.test.demo.repo.StakeHolderRepo;

@Service
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	private PasswordEncoder bcryptEncoder;
	
	@Autowired
	private EmployeeRepo employeeRepo;
	
	@Autowired
	private ProjectRepo projectRepo;
	
	@Autowired
	private FilesRepo filesRepo;
	
	@Autowired
	private EmpProjectRepo empProjectRepo;
	
	@Autowired
	private StakeHolderRepo stakeHolderRepo;
	
	@Autowired
	private OwnerRepo ownerRepo;
	
	@Autowired
	private NewsfeedRepo newsfeedRepo;
	
	@Autowired
	private JobVacancyRepo jobVacancyRepo;
	
	@Autowired
	private FeedbackRepo feedbackRepo;
	
	@Autowired
	private PolicyRepo policyRepo;
	
	@Autowired
	private CommentRepo commentRepo;
	
	@Autowired
	private EmailSendService emailSendService;
	
	
	@Override
	public List<Employee> getAllEmployees() {
		return employeeRepo.findAllEmp();
	}
	
	@Override
	public Employee updateEmployee(long id, EmployeeDto employeeDto) {
		Employee employee=employeeRepo.findById(id).orElseThrow(()->new NotFound());
		Employee emp1=employeeRepo.CheckByContact(employeeDto.getContact());
		if(emp1!=null && emp1!=employee) {
			throw new AlreadyThere();
		}
		Employee emp2=employeeRepo.CheckByEmail(employeeDto.getEmail());
		if(emp2!=null && emp2!=employee) {
			throw new AlreadyThere();
		}
		employee.setName(employeeDto.getName());
		employee.setEmail(employeeDto.getEmail());
		//employee.setPassword(bcryptEncoder.encode(employeeDto.getPassword()));
		employee.setDate_of_birth(employeeDto.getDate_of_birth());
		employee.setGender(employeeDto.getGender());
		//employee.setRole(employeeDto.getRole());
		//employee.setSalary(employeeDto.getSalary());
		employee.setAddress(employeeDto.getAddress());
		employee.setContact(employeeDto.getContact());
		employee.setWorkingStatus("Working");
		return employeeRepo.save(employee);
	}
	
	@Override
	public void deleteEmpById(long id) {
		Employee employee=employeeRepo.findById(id).orElseThrow(()->new NotFound());
		employee.setWorkingStatus("Resigned");
		employeeRepo.save(employee);
	}

	
	@Override
	public Employee getEmployeeByName(String name) {
		return employeeRepo.findByUsermail(name);
	}
	
	@Override
	public Optional<Employee> getEmployeeById(long id) {
		
		return employeeRepo.findById(id);
	}


	@Override
	public List<Employee> getEmployeeByStatus(String status) {
		return employeeRepo.findByStatus(status);
	}
	
	
	@Override
	public List<Employee> getAllManager() {
		
		return employeeRepo.findAllManager();
	}

	@Override
	public List<Employee> getAllHr() {
		
		return employeeRepo.findAllHr();
	}


	
	@Override
	public void addEmpProj(EmpProjDto empProjDto) {
		List<Employee> eList=new ArrayList<Employee>();
		Project pro=projectRepo.findById(empProjDto.getProj_id()).orElseThrow(()->new NotFound());
		for(Long id : empProjDto.getEmp_ids()) {
			Employee employee=employeeRepo.findById(id).orElseThrow(()->new NotFound());
			if(!employee.getRole().equalsIgnoreCase("Manager") && !employee.getRole().equalsIgnoreCase("Hr") && !employee.getRole().equalsIgnoreCase("Admin") && !employee.getWorkingStatus().equalsIgnoreCase("Resigned")){
			eList.add(employee);
			}
		}
		/*for(Employee e:eList) {
			EmployeeProject ep=new EmployeeProject();
			ep.setEmp_id(e);
			ep.setProj_id(pro);
			ep.setStartDate(pro.getStartDate());
			ep.setEndDate(pro.getEndDate());
			ep.setStatus(pro.getStatus());
			//ep.setStartDate(empProjDto.getStart_date());
			//ep.setEndDate(empProjDto.getEnd_date());
			//ep.setStatus(empProjDto.getStatus());
			empProjectRepo.save(ep);
		}*/
		
		for(Employee e:eList) {
			List<EmployeeProject> empPro=empProjectRepo.findByEmpId(e.getEmp_id());
			for(EmployeeProject em:empPro) {
				if(em.getProj_id().getStatus().equals("Started") || em.getProj_id().getStatus().equals("In Progress")) {
					throw new AlreadyThere();
				}
			}
			EmployeeProject ep=new EmployeeProject();
			ep.setEmp_id(e);
			ep.setProj_id(pro);
			ep.setStartDate(pro.getStartDate());
			ep.setEndDate(pro.getEndDate());
			ep.setStatus(pro.getStatus());
			//ep.setStartDate(empProjDto.getStart_date());
			//ep.setEndDate(empProjDto.getEnd_date());
			//ep.setStatus(empProjDto.getStatus());
			empProjectRepo.save(ep);
		}
	}
	/*
	@Override
	public EmployeeProject updateEmpProject(long id, EmpProjDto empProjDto) {
		EmployeeProject emPro=empProjectRepo.findById(id).orElseThrow(()->new NotFound());
		Project pro=projectRepo.findById(empProjDto.getProj_id()).orElseThrow(()->new NotFound());
		List<Long> eid_list=empProjDto.getEmp_ids();
		List<Employee> emp_list=new ArrayList<Employee>();
		for(Long e : empProjDto.getEmp_ids()) {
			Employee employee=employeeRepo.findById(e).orElseThrow(()->new NotFound());
			if(!employee.getRole().equalsIgnoreCase("Manager") && !employee.getRole().equalsIgnoreCase("Hr") && !employee.getWorkingStatus().equalsIgnoreCase("Resigned")){
			emp_list.add(employee);
			}
		}
         Employee employee=emp_list.get(0);
         emPro.setEmp_id(employee);
         emPro.setProj_id(pro);
         emPro.setStartDate(pro.getStartDate());
		 emPro.setEndDate(pro.getEndDate());
		 emPro.setStatus(pro.getStatus());
        // emPro.setStartDate(empProjDto.getStart_date());
        // emPro.setEndDate(empProjDto.getEnd_date());
        // emPro.setStatus(empProjDto.getStatus());
         return empProjectRepo.save(emPro);
		
	
	}*/
	
	@Override
	public void deleteByEmpProjId(long id) {
		empProjectRepo.deleteById(id);
	}
	
	/*@Override
	public void addEmployee(Employee employee) {
		employeeRepo.save(employee);
	}*/

	@Override
	public List<EmployeeProject> getAllEProjects() {
		
		return empProjectRepo.findAll();
	}

	@Override
	public List<ProjectDetailsDto> getProjByEmpId(long id) {
		List<EmployeeProject> ep=empProjectRepo.findAll();
		List<ProjectDetailsDto> pList=new ArrayList<ProjectDetailsDto>();
		List<Project> lp=new ArrayList<>();
		for(EmployeeProject e:ep) {
			if(e.getEmp_id().getEmp_id()==id) {
				Project project=projectRepo.findById(e.getProj_id().getProj_id()).get();
				lp.add(project);
			}
		}
		for(Project p:lp) {
			ProjectDetailsDto projectD=new ProjectDetailsDto();
			List<Employee> elist=new ArrayList<Employee>();
			List<EmployeeProject> emp=empProjectRepo.findEmpByProjId(p.getProj_id());
			for(EmployeeProject q:emp) {
				elist.add(q.getEmp_id());
			}
			projectD.setEmp_list(elist);
			projectD.setProject(p);
			pList.add(projectD);
		}
		return pList;
		
		
		/*List<EmployeeProject> ep=empProjectRepo.findAll();
		List<EmpProjDto> lProjDtos=new ArrayList<>();
		for(EmployeeProject e:ep) {
			if(e.getEmp_id().getEmp_id()==id) {
				EmpProjDto eeDto=new EmpProjDto();
				eeDto.setEmp_id(e.getEmp_id().getEmp_id());
				eeDto.setProj_id(e.getProj_id().getProj_id());
				eeDto.setStart_date(e.getStartDate());
				eeDto.setEnd_date(e.getEndDate());
				eeDto.setStatus(e.getStatus());
				lProjDtos.add(eeDto);
			}
		}
		return lProjDtos;  */
	}
	
	@Override
	public ProjectDetailsDto getEmpByProjId(long id) {
		List<EmployeeProject> epList=empProjectRepo.findEmpByProjId(id);
		Project pro=projectRepo.findById(id).orElseThrow(()->new NotFound());
		ProjectDetailsDto projectDetailsDto=new ProjectDetailsDto();
		List<Employee> eList=new ArrayList<Employee>();
		for(EmployeeProject e:epList) {
			eList.add(e.getEmp_id());
		}
		projectDetailsDto.setEmp_list(eList);
		projectDetailsDto.setProject(pro);
	    return projectDetailsDto;
		//return empProjectRepo.findEmpByProjId(id);
	}
	
	@Override
	public List<EmployeeProject> getByEmpId(long id) {
		
		return empProjectRepo.findByEmpId(id);
	}

	@Override
	public List<EmployeeProject> getEmpProjectByOName(String name) {
		
		return empProjectRepo.findByOwnerName(name);
	}
	
/*	@Override
	public ProjectDetailsDto getIndividualProdetails(long id) {
		List<EmployeeProject> list=empProjectRepo.findEmpByProjId(id);
		Project project=projectRepo.findById(id).orElseThrow(()->new NotFound());
		List<Employee> e_list=new ArrayList<Employee>();
		for(EmployeeProject e:list) {
			e_list.add(e.getEmp_id());
		}
		Set<Employee> m_list=new HashSet<Employee>();
		for(EmployeeProject e:list) {
			m_list.add(e.getManager_id());
		}
		Set<Employee> hr_list=new HashSet<Employee>();
		for(EmployeeProject e:list) {
			hr_list.add(e.getHr_id());
		}
		//List<Employee> mList=new ArrayList<Employee>(m_list);
		//List<Employee> hrList=new ArrayList<Employee>(hr_list);
		ProjectDetailsDto projectDetailsDto=new ProjectDetailsDto();
		projectDetailsDto.setProject(project);
		projectDetailsDto.setEmp_list(e_list);
		//projectDetailsDto.setManager(mList);
		//projectDetailsDto.setHr(hrList);
		projectDetailsDto.setStartDate(list.get(0).getStartDate());
		projectDetailsDto.setEndDate(list.get(0).getEndDate());
		projectDetailsDto.setStatus(list.get(0).getStatus());
		return projectDetailsDto; 
	} */


	@Override
	public Document storeFile(long id,String name,MultipartFile file){
		// TODO Auto-generated method stub
		Employee e=employeeRepo.findById(id).orElseThrow(()->new NotFound());
		//String filename=org.springframework.util.StringUtils.cleanPath(file.getOriginalFilename());
		try {
			System.out.println(file.getContentType());
			System.out.println(file.getBytes());
			System.out.println(e.toString());
			Document doc=new Document();
			doc.setEmployee(e);
			doc.setName(name);
			doc.setType(file.getContentType());
			doc.setData(file.getBytes());
			filesRepo.save(doc);
			return doc;
		}catch (Exception exp) {
			throw new NotFound();
		}
	}

	@Override
	public Document getFile(long fileId) {
		Document doc=filesRepo.findById(fileId).orElseThrow(()->new NotFound());
		return doc;
	}

	@Override
	public Document downloadDoc(long id, long docId) {
		Employee employee=employeeRepo.findById(id).orElseThrow(()->new NotFound());
		Document document=filesRepo.findById(docId).orElseThrow(()->new NotFound());
		if(!document.getEmployee().equals(employee)) {
			throw new NotFound();
		}
		return document;
	}

	
	@Override
	public List<Document> getDocByEmpId(long id) {
		
		return filesRepo.findByEmpId(id) ;
	}
	
	@Override
	public String getFileExt(String type) {
		if(type.equals(MediaType.APPLICATION_PDF_VALUE)) {
		return "pdf";
		}
		else if(type.equals(MediaType.IMAGE_PNG_VALUE)) {
			return "png";
			}
		else if (type.equals(MediaType.IMAGE_JPEG_VALUE)) {
			return "jpeg";
		}
		return "docx";
	}

	@Override
	public void addProject(ProjectDto projectDto) {
		Employee manager=employeeRepo.findManager(projectDto.getM_id());
		
		if(manager==null || manager.getWorkingStatus().equals("Resigned")) {
			throw new NotFound();
		}
		Employee hr=employeeRepo.findHr(projectDto.getHr_id());
		
		if(hr==null || hr.getWorkingStatus().equals("Resigned")) {
			throw new NotFound();
		}
		StakeHolder sh=stakeHolderRepo.findById(projectDto.getStakeholder_id()).orElseThrow(()->new NotFound());
		
		Owner owner=ownerRepo.findById(projectDto.getOwner_id()).orElseThrow(()->new NotFound());
		
		Project project=new Project();
		project.setTitle(projectDto.getTitle());
		project.setDescription(projectDto.getDescription());
		project.setManager(manager);
		project.setHr(hr);
		project.setStakeHolder(sh);
		project.setOwner(owner);
		project.setStartDate(projectDto.getStartDate());
		project.setEndDate(projectDto.getEndDate());
		project.setStatus(projectDto.getStatus());
		projectRepo.save(project);
	}
	@Override
	public Project updateProject(long id, ProjectDto projectDto) {
		Employee manager=employeeRepo.findManager(projectDto.getM_id());
		if(manager==null || manager.getWorkingStatus().equals("Resigned")) {
			throw new NotFound();
		}
		Employee hr=employeeRepo.findHr(projectDto.getHr_id());
		if(hr==null || hr.getWorkingStatus().equals("Resigned")) {
			throw new NotFound();
		}
		Project project=projectRepo.findById(id).orElseThrow(()->new NotFound());
		StakeHolder stakeHolder=stakeHolderRepo.findById(projectDto.getStakeholder_id()).orElseThrow(()->new NotFound());
		Owner owner=ownerRepo.findById(projectDto.getOwner_id()).orElseThrow(()->new NotFound());
		project.setTitle(projectDto.getTitle());
		project.setDescription(projectDto.getDescription());
		project.setManager(manager);
		project.setHr(hr);
		project.setStakeHolder(stakeHolder);
		project.setOwner(owner);
		project.setStartDate(projectDto.getStartDate());
		project.setEndDate(projectDto.getEndDate());
		project.setStatus(projectDto.getStatus());
		return projectRepo.save(project);
	}
	
	@Override
	public void deleteProject(long id) {
		projectRepo.deleteById(id);
	}


	@Override
	public List<Project> getAllProjects() {
		return projectRepo.findAll();
	}

	@Override
	public List<Project> getProjByStatus(String status) {
		
		return projectRepo.findProjByStatus(status);
	}

	
	@Override
	public List<StakeHolder> getAllStakeHolders() {
		
		return stakeHolderRepo.findAll();
	}

	@Override
	public List<Owner> getallOwners() {
		
		return ownerRepo.findAll();
	}
	
	@Override
	public void addStakeHolder(StakeHolder stakeHolder) {
		stakeHolderRepo.save(stakeHolder);
	}

	@Override
	public void addOwner(Owner owner) {
		ownerRepo.save(owner);
	}
	
	@Override
	public StakeHolder updateStakeHolder(long id, StakeHolder stakeHolder) {
		StakeHolder st=stakeHolderRepo.findById(id).orElseThrow(()->new NotFound());
		st.setName(stakeHolder.getName());
		st.setEmail(stakeHolder.getEmail());
		st.setContact(stakeHolder.getContact());
		return stakeHolderRepo.save(st);
	}

	@Override
	public Owner updateOwner(long id, Owner owner) {
		Owner own=ownerRepo.findById(id).orElseThrow(()->new NotFound());
		own.setName(owner.getName());
		own.setEmail(owner.getEmail());
		own.setContact(owner.getContact());
		return ownerRepo.save(own);
	}
	
	@Override
	public void deleteStakeHolder(long id) {
		stakeHolderRepo.deleteById(id);
	}

	@Override
	public void deleteOwner(long id) {
		ownerRepo.deleteById(id);
	}

	@Override
	public void addNewsfeed(NewsfeedDto newsfeedDto) {
		NewsFeed nf=new NewsFeed();
		nf.setTitle(newsfeedDto.getTitle());
		nf.setDescription(newsfeedDto.getDescription());
		Employee hr=employeeRepo.findHr(newsfeedDto.getHr_id());
		if(hr==null || hr.getWorkingStatus().equals("Resigned")) {
			throw new NotFound();
		}
		nf.setHr(hr);
		newsfeedRepo.save(nf);
		List<Employee> list=employeeRepo.findAllEmp();
		for(Employee e:list) {
			emailSendService.sendEmail("bodduharshasrikanth@gmail.com", e.getEmail(), newsfeedDto.getTitle(),
					"Greetings,"+"\n\n"+
			         "Dear "+e.getName()+","+"\n\n"+
					"Check out this from our website,which will be helpful"+"\n\n"+
					newsfeedDto.getDescription()+"\n\n"
			+"Please ignore this email(testing purpose)");
		}
		
		//emailSendService.sendEmail("hr.getEmail()","EmployeeMail","nf.getTitle","nf.getDescription" );
		
	}

	@Override
	public void addJob(JobDto jobDto) {
		JobVacancy jv=new JobVacancy();
		jv.setJobRole(jobDto.getJob_role());
		jv.setDescription(jobDto.getDescription());
		jv.setVacancies(jobDto.getVacancies());
		Employee hr=employeeRepo.findHr(jobDto.getHr_id());
		if(hr==null || hr.getWorkingStatus().equals("Resigned")) {
			throw new NotFound();
		}
		jv.setHr(hr);
		jobVacancyRepo.save(jv);
		List<Employee> list=employeeRepo.findAllEmp();
		for(Employee e:list) {
			emailSendService.sendEmail("bodduharshasrikanth@gmail.com", e.getEmail(), jobDto.getJob_role(),
					"Greetings,"+"\n\n"+
					 "Dear "+e.getName()+","+"\n\n"+
					 "Check out this job notifications from our website,which will be helpful"+"\n\n"+
					jobDto.getDescription()+"\n\n"+
		"Vacancies : "+jobDto.getVacancies()+"\n\n"+"Please ignore this email(Testing purpose)");
		}
		//emailSendService.sendEmail("hr.getEmail()","EmployeeMail","job.getTitle","job.getDescription" );
		
	}

	@Override
	public List<NewsFeed> getAllNewsFeeds() {
		return newsfeedRepo.findAll();
	}

	@Override
	public List<JobVacancy> getallJobVacancies() {
		return jobVacancyRepo.findAll();
	}

	@Override
	public NewsFeed updateNewsFeed(long id, NewsfeedDto newsfeedDto) {
		NewsFeed nf=newsfeedRepo.findById(id).orElseThrow(()->new NotFound());
		Employee hr=employeeRepo.findHr(newsfeedDto.getHr_id());
		if(hr==null || hr.getWorkingStatus().equals("Resigned")) {
			throw new NotFound();
		}
		nf.setTitle(newsfeedDto.getTitle());
		nf.setDescription(newsfeedDto.getDescription());
		nf.setHr(hr);
		return newsfeedRepo.save(nf);
	}

	@Override
	public JobVacancy updateJobVacancy(long id, JobDto jobDto) {
		JobVacancy job=jobVacancyRepo.findById(id).orElseThrow(()->new NotFound());
		Employee hr=employeeRepo.findHr(id);
		if(hr==null || hr.getWorkingStatus().equals("Resigned")) {
			throw new NotFound();
		}
		job.setJobRole(jobDto.getJob_role());
		job.setDescription(jobDto.getDescription());
		job.setVacancies(jobDto.getVacancies());
		job.setHr(hr);
		return jobVacancyRepo.save(job);
	}

	@Override
	public void deleteNewsfeed(long id) {
		newsfeedRepo.deleteById(id);
		
	}

	@Override
	public void deleteJob(long id) {
	     jobVacancyRepo.deleteById(id);
		
	}

	@Override
	public void addFeedback(FeedbackDto feedbackDto) {
		
		Employee employee=employeeRepo.findById(feedbackDto.getEmp_id()).orElseThrow(()->new NotFound());
		if(employee.getWorkingStatus().equals("Resigned")) {
			throw new NotFound();
		}
		Feedback fb=new Feedback();
		fb.setType(feedbackDto.getType());
		fb.setDescription(feedbackDto.getDescription());
		fb.setEmp(employee);
		feedbackRepo.save(fb);
		
	}

	@Override
	public List<Feedback> getAllFeedback() {
		
		return feedbackRepo.findAll();
	}

	@Override
	public Policies storefiles(String name, MultipartFile file) {
		// TODO Auto-generated method stub
		Policies py=new Policies();
		try {
		py.setName(name);
		py.setType(file.getContentType());
		py.setData(file.getBytes());
		policyRepo.save(py);
		return py;
		}
		catch (Exception e) {
			// TODO: handle exception
			throw new NotFound();
		}
		
	}

	
	@Override
	public Policies downloadPolicy(long id) {
		Policies py=policyRepo.findById(id).orElseThrow(()->new NotFound());
		return py;
	}

	@Override
	public Comments addComment(long newsId, long empId, String comment) {
		NewsFeed nf=newsfeedRepo.findById(newsId).orElseThrow(()->new NotFound());
		Employee emp=employeeRepo.findById(empId).orElseThrow(()->new NotFound());
		
		Comments cmts=new Comments();
		cmts.setNews(nf);
		cmts.setEmployee(emp);
		cmts.setDescription(comment);
		return commentRepo.save(cmts);
	}

	@Override
	public List<Comments> getCommentsByNewsId(long newsId) {
	    List<Comments> cl=commentRepo.findByNewsId(newsId);
		return cl;
	}

	
	
	

	
	

	
}
