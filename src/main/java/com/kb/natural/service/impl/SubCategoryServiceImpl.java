package com.kb.natural.service.impl;

import com.kb.natural.service.SubCategoryService;
import com.kb.natural.domain.SubCategory;
import com.kb.natural.repository.SubCategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing SubCategory.
 */
@Service
@Transactional
public class SubCategoryServiceImpl implements SubCategoryService {

    private final Logger log = LoggerFactory.getLogger(SubCategoryServiceImpl.class);

    private final SubCategoryRepository subCategoryRepository;

    public SubCategoryServiceImpl(SubCategoryRepository subCategoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
    }

    /**
     * Save a subCategory.
     *
     * @param subCategory the entity to save
     * @return the persisted entity
     */
    @Override
    public SubCategory save(SubCategory subCategory) {
        log.debug("Request to save SubCategory : {}", subCategory);
        return subCategoryRepository.save(subCategory);
    }

    /**
     * Get all the subCategories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<SubCategory> findAll(Pageable pageable) {
        log.debug("Request to get all SubCategories");
        return subCategoryRepository.findAll(pageable);
    }

    /**
     * Get one subCategory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SubCategory findOne(Long id) {
        log.debug("Request to get SubCategory : {}", id);
        return subCategoryRepository.findOne(id);
    }

    /**
     * Delete the subCategory by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SubCategory : {}", id);
        subCategoryRepository.delete(id);
    }
}
